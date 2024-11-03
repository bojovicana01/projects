//
// Created by os on 8/10/23.
//

#include "../h/TCB.hpp"
#include "../h/riscv.hpp"
#include "../h/syscall_c.hpp"

TCB* TCB::running = nullptr;
uint64 TCB::timeSliceCounter = 0;

bool TCB::getFlagSemaphoreValue() { return flagSemaphore; }
void TCB::setFlagSemaphoreTrue() { flagSemaphore = true; }
void TCB::setFlagSemaphoreFalse() { flagSemaphore = false; }
bool TCB::isFinished() { return finished; }
void TCB::setFinished(bool value) { finished = value; }
uint64 TCB::getTimeSlice() { return timeSlice; }
void TCB::setNext(TCB* newNext) { next = newNext;}
TCB* TCB::getNext() { return next; }

void TCB::queueForJoinPut(TCB * handle) {

    uint64 wholeBlocks = sizeof (QueueElem) / MEM_BLOCK_SIZE;
    uint64 sizeNeeded = wholeBlocks + (uint64) ((wholeBlocks * MEM_BLOCK_SIZE == sizeof (QueueElem))?0:1);

    QueueElem* newEl = (QueueElem*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(sizeNeeded);
    newEl->data = handle;
    newEl->next = nullptr;

    if (queueForJoinTail) {
        queueForJoinTail->next = newEl;
    }
    else {
        queueForJoinHead = newEl;
    }
    queueForJoinTail = newEl;

}

void TCB::queueForJoinRelease() {
    QueueElem* curr;
    for (curr = queueForJoinHead; curr != nullptr; curr = curr->next) {
        Scheduler::getSchedulerInstance()->schedulerPut(curr->data);
    }
    while (queueForJoinHead != nullptr) {
        QueueElem* curr = queueForJoinHead;
        queueForJoinHead = queueForJoinHead->next;
        MemoryAllocator::getMemoryAllocatorInstance()->mem_free(curr);
    }

    queueForJoinHead = nullptr;
    queueForJoinTail = nullptr;
}

TCB* TCB::createThread(TCB::Body body, void* arg, uint64* stack) {

    // mozda bi valjalo da se proveri da li je stack == nullptr

    uint64 wholeBlocks1 = sizeof (TCB) / MEM_BLOCK_SIZE;
    uint64 sizeNeeded1 = wholeBlocks1 + (uint64) ((wholeBlocks1 * MEM_BLOCK_SIZE == sizeof (TCB))?0:1);

    TCB* newTCB = (TCB*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(sizeNeeded1);
    if (newTCB == nullptr) return nullptr;

    newTCB->body = body;

    /*
    uint64 wholeBlocks2 = (sizeof (uint64) * STACK_SIZE) / MEM_BLOCK_SIZE;
    uint64 sizeNeeded2 = wholeBlocks2 + (uint64) ((wholeBlocks2 * MEM_BLOCK_SIZE == (sizeof (uint64) * STACK_SIZE))?0:1);
    if (body != nullptr) {
        newTCB->stack = (uint64*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(sizeNeeded2);
    }
    else {
        newTCB->stack = nullptr;
    }
    */

    newTCB->stack = stack;

    newTCB->context.ra = (uint64) &threadWrapper;
    if (newTCB->stack != nullptr) {
        newTCB->context.sp = (uint64) &newTCB->stack[DEFAULT_STACK_SIZE]; // proveri ovo jer sp treba da pokazuje na poslednju zauzetu lokaciju
    }
    else {
        newTCB->context.sp = 0;
    }

    newTCB->timeSlice = DEFAULT_TIME_SLICE;

    newTCB->finished = false;
    newTCB->arg = arg;
    newTCB->flagSemaphore = false;
    newTCB->queueForJoinHead = nullptr;
    newTCB->queueForJoinTail = nullptr;

    if (newTCB->body != nullptr) Scheduler::getSchedulerInstance()->schedulerPut(newTCB);

    return newTCB;

}

TCB* TCB::createThread2(TCB::Body body, void* arg, uint64* stack) {

    // mozda bi valjalo da se proveri da li je stack == nullptr

    uint64 wholeBlocks1 = sizeof (TCB) / MEM_BLOCK_SIZE;
    uint64 sizeNeeded1 = wholeBlocks1 + (uint64) ((wholeBlocks1 * MEM_BLOCK_SIZE == sizeof (TCB))?0:1);

    TCB* newTCB = (TCB*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(sizeNeeded1);
    if (newTCB == nullptr) return nullptr;

    newTCB->body = body;

    /*
    uint64 wholeBlocks2 = (sizeof (uint64) * STACK_SIZE) / MEM_BLOCK_SIZE;
    uint64 sizeNeeded2 = wholeBlocks2 + (uint64) ((wholeBlocks2 * MEM_BLOCK_SIZE == (sizeof (uint64) * STACK_SIZE))?0:1);
    if (body != nullptr) {
        newTCB->stack = (uint64*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(sizeNeeded2);
    }
    else {
        newTCB->stack = nullptr;
    }
    */

    newTCB->stack = stack;

    newTCB->context.ra = (uint64) &threadWrapper;
    if (newTCB->stack != nullptr) {
        newTCB->context.sp = (uint64) &newTCB->stack[DEFAULT_STACK_SIZE]; // proveri ovo jer sp treba da pokazuje na poslednju zauzetu lokaciju
    }
    else {
        newTCB->context.sp = 0;
    }

    newTCB->timeSlice = DEFAULT_TIME_SLICE;

    newTCB->finished = false;
    newTCB->arg = arg;
    newTCB->flagSemaphore = false;
    newTCB->queueForJoinHead = nullptr;
    newTCB->queueForJoinTail = nullptr;

    return newTCB;

}

void TCB::deallocateThread(TCB *thread) {
    MemoryAllocator::getMemoryAllocatorInstance()->mem_free(thread->stack);
    MemoryAllocator::getMemoryAllocatorInstance()->mem_free(thread);
}


void TCB::yield() {
    // za asinhroni deo
//    __asm__ volatile("li a6, 0x66");
//    __asm__ volatile("ecall");

    Riscv::pushRegisters();
    TCB::dispatch();
    Riscv::popRegisters();

}

void TCB::dispatch() {
    TCB *old = running;
    if (!old->isFinished()) { Scheduler::getSchedulerInstance()->schedulerPut(old); }
    running = Scheduler::getSchedulerInstance()->schedulerGet();

    TCB::contextSwitch(&old->context, &running->context);
}

void TCB::threadWrapper() {
    Riscv::popSppSpie(); // ovo sluzi kada imamo niti koje su tek krenule da se izvrsavaju da bismo se vratili iz prekidne rutine
    running->body(running->arg);
    running->setFinished(true);

    running->queueForJoinRelease();

    thread_exit();
}

void TCB::exitThread() {
    running->setFinished(true);
    TCB::yield();
}

void TCB::join(TCB* handle) {

//    if (!handle->isFinished()) {
//
//        handle->queueForJoinPut(running);
//
//        TCB* old = running;
//        running = handle;
//
//        TCB::contextSwitch(&old->context, &running->context);
//    }

    while (!handle->isFinished()) TCB::dispatch();

}

void TCB::switchContextFromOutside(TCB *oldTCB, TCB *newTCB) {
    Riscv::pushRegisters();
    contextSwitch(&oldTCB->context, &newTCB->context);
    Riscv::popRegisters();
}

void TCB::idleFun(void * params) {
    while (1) {}
}

