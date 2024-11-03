//
// Created by os on 8/7/23.
//
#include "../h/syscall_cpp.hpp"

//----------------------------MEMORIJA---------------------------------------

void* operator new (size_t size) {
    uint64 wholeBlocks = size / MEM_BLOCK_SIZE;
    uint64 sizeNeeded = wholeBlocks + (uint64) ((wholeBlocks * MEM_BLOCK_SIZE == size)?0:1);
    return mem_alloc(sizeNeeded);
}

void operator delete (void* toFree) {
    mem_free(toFree);
}


void* operator new[](size_t size){
    uint64 wholeBlocks = size / MEM_BLOCK_SIZE;
    uint64 sizeNeeded = wholeBlocks + (uint64) ((wholeBlocks * MEM_BLOCK_SIZE == size)?0:1);
    return mem_alloc(sizeNeeded);
}

void operator delete[](void* toFree) {
    mem_free(toFree);
}

//----------------------------KRAJ MEMORIJE-----------------------------------

//----------------------------NITI--------------------------------------------

Thread::Thread (void (*body)(void*), void* arg) {
    thread_create(&myHandle, body, arg);
    this->body = body; // ovo nije bilo ranijih godina ne znam da li treba ovako
    this->arg = arg;
}

Thread::~Thread () {
    TCB::deallocateThread(myHandle); // proveri da li mora da se poziva sistemski poziv
}

int Thread::start() {
    if (this->body != nullptr) Scheduler::getSchedulerInstance()->schedulerPut(myHandle);
    return 0; // vidi sta treba kao povratna vrednost
}

void Thread::join() {
    thread_join(myHandle);
}

void Thread::dispatch() {
    thread_dispatch();
}

void runWrapper(void* arg) {
    Thread *t = (Thread *) arg;
    t->run();
}

Thread::Thread() {
    thread_create_2(&myHandle, runWrapper, this);
}

int Thread::sleep(time_t) {return 0;}

//----------------------------KRAJ NITI---------------------------------------

//----------------------------SEMAFORI---------------------------------------

Semaphore::Semaphore(unsigned int init) {
    sem_open(&myHandle, init);
}

Semaphore::~Semaphore() {
    sem_close(myHandle);
}

int Semaphore::wait() {
    return sem_wait(myHandle);
}

int Semaphore::signal() {
    return sem_signal(myHandle);
}

//----------------------------KRAJ SEMAFORA----------------------------------



//----------------------------NEIMPLEMENTIRANI DEO---------------------------
//----------------------------PERIODICNE NITI--------------------------------
void PeriodicThread::terminate() {}
PeriodicThread::PeriodicThread(time_t period) {}
//---------------------------KRAJ PERIODICNIH NITI---------------------------
//---------------------------KONOZLA-----------------------------------------
char Console::getc() {
    return ::getc();
}
void Console::putc(char c) {
    ::putc(c);
}
//---------------------------KRAJ KONZOLE------------------------------------
//----------------------------KRAJ NEIMPLEMENTIRANOG DELA--------------------