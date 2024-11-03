//
// Created by os on 9/7/23.
//

#include "../h/MySemaphore.hpp"

MySemaphore* MySemaphore::allocateSemaphore(unsigned int init) {

    uint64 wholeBlocks = sizeof (MySemaphore) / MEM_BLOCK_SIZE;
    uint64 sizeNeeded = wholeBlocks + (uint64) ((wholeBlocks * MEM_BLOCK_SIZE == sizeof (MySemaphore))?0:1);

    MySemaphore* newSemaphore = (MySemaphore*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(sizeNeeded);
    if (newSemaphore == nullptr) return nullptr;

    newSemaphore->val = init;
    newSemaphore->blockedSemHead = nullptr;
    newSemaphore->blockedSemTail = nullptr;

    return newSemaphore;

}

int MySemaphore::deallocateSemaphore(MySemaphore *handle) {

    int ret = 0;

    BlockedThread* curr = handle->blockedSemHead;
    while (curr) {

        curr->blockedThread->setFlagSemaphoreTrue();
        Scheduler::getSchedulerInstance()->schedulerPut(curr->blockedThread);

        BlockedThread* tempCurr = curr->next;

        ret = MemoryAllocator::getMemoryAllocatorInstance()->mem_free(curr);
        if (ret < 0) return ret;

        curr = tempCurr;
    }
    // bespotrebno ali za svaki slucaj
    handle->blockedSemHead = nullptr;
    handle->blockedSemTail = nullptr;

    ret = MemoryAllocator::getMemoryAllocatorInstance()->mem_free(handle);

    return ret;

}

void MySemaphore::block() {

    TCB* oldRunning = TCB::running;

    uint64 wholeBlocks = sizeof (BlockedThread) / MEM_BLOCK_SIZE;
    uint64 sizeNeeded = wholeBlocks + (uint64) ((wholeBlocks * MEM_BLOCK_SIZE == sizeof (BlockedThread))?0:1);

    BlockedThread* newBlocked = (BlockedThread*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(sizeNeeded);

    newBlocked->next = nullptr;
    newBlocked->blockedThread = oldRunning;

    if (blockedSemTail) {
        blockedSemTail->next = newBlocked;
    }
    else {
        blockedSemHead = newBlocked;
    }
    blockedSemTail = newBlocked;

    TCB* newRunning = Scheduler::getSchedulerInstance()->schedulerGet();
    TCB::running = newRunning;

    TCB::switchContextFromOutside(oldRunning, TCB::running);

}

void MySemaphore::unblock() {

    TCB* pom = blockedSemHead->blockedThread;
    Scheduler::getSchedulerInstance()->schedulerPut(pom);

    BlockedThread* btToDeallocate = blockedSemHead;

    blockedSemHead = blockedSemHead->next;
    if (blockedSemHead == nullptr) blockedSemTail = nullptr;

    MemoryAllocator::getMemoryAllocatorInstance()->mem_free(btToDeallocate);

}

int MySemaphore::wait() {
    if (--val < 0) block();
    // ako je semafor dealociran vraca negativnu vrednost
    if (TCB::running->getFlagSemaphoreValue() == true) {
        TCB::running->setFlagSemaphoreFalse();
        return -1;
    }
    else {
        return 0;
    }
}

int MySemaphore::signal() {
    if (val++ < 0) unblock();
    return 0;
}
