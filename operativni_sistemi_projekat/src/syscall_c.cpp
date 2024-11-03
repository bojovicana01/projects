//
// Created by os on 8/6/23.
//

#include "../h/syscall_c.hpp"

//----------------------------MEMORIJA---------------------------------------

void* mem_alloc (size_t size) {

    // dobije velicinu u bajtovima i zaokruzuje je na cele blokove
    size_t wholeBlocks = size / MEM_BLOCK_SIZE;
    size_t remainder = size - wholeBlocks * MEM_BLOCK_SIZE;
    size_t numOfBlocks = wholeBlocks + (remainder == 0) ? 0 : 1;

    __asm__ volatile("mv a1, %0" : : "r" (numOfBlocks));
    __asm__ volatile("li a0, 0x01");

    __asm__ volatile("ecall");

    uint64 retVal;
    __asm__ volatile("mv %0, a0" : "=r" (retVal));

    char* address = (char*) retVal;

    return address;

}

int mem_free (void* toFree) {

    char* toFreePtr = (char*) toFree;

    __asm__ volatile("mv a1, %0" : : "r" ((uint64) toFreePtr));
    __asm__ volatile("li a0, 0x02");

    __asm__ volatile("ecall");

    uint64 retVal;
    __asm__ volatile("mv %0, a0" : "=r" (retVal));

    return (int) retVal;

}

//----------------------------KRAJ MEMORIJE----------------------------------

//----------------------------NITI-------------------------------------------

int thread_create (thread_t* handle, void(*start_routine)(void*), void* arg) {

//    uint64 wholeBlocks = (sizeof (uint64) * DEFAULT_STACK_SIZE) / MEM_BLOCK_SIZE;
//    uint64 sizeNeeded = wholeBlocks + (uint64) ((wholeBlocks * MEM_BLOCK_SIZE == (sizeof (uint64) * DEFAULT_STACK_SIZE))?0:1);
//
//    uint64* stack;
//    stack = (uint64*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(sizeNeeded);
//
    __asm__ volatile("mv a3, %0" : : "r" ((uint64) arg));
    __asm__ volatile("mv a2, %0" : : "r" ((uint64) start_routine));
    __asm__ volatile("mv a1, %0" : : "r" ((uint64) handle));
    __asm__ volatile("li a0, 0x11");

    __asm__ volatile("ecall");

    uint64 retVal;
    __asm__ volatile("mv %0, a0" : "=r" (retVal));

    return (int) retVal;

}

int thread_exit () {
    __asm__ volatile("li a0, 0x12");
    __asm__ volatile("ecall");
    uint64 retVal;
    __asm__ volatile("mv %0, a0" : "=r" (retVal));
    return (int) retVal;
}

void thread_dispatch () {
    __asm__ volatile("li a0, 0x13");
    __asm__ volatile("ecall");

}

void thread_join (thread_t handle) {
    __asm__ volatile("mv a1, %0" : : "r" ((uint64) handle));
    __asm__ volatile("li a0, 0x14");
    __asm__ volatile("ecall");

}

// dodatni sistemski pozivi
int thread_create_2 (thread_t* handle, void(*start_routine)(void*), void* arg) {

    __asm__ volatile("mv a3, %0" : : "r" ((uint64) arg));
    __asm__ volatile("mv a2, %0" : : "r" ((uint64) start_routine));
    __asm__ volatile("mv a1, %0" : : "r" ((uint64) handle));
    __asm__ volatile("li a0, 0x51");

    __asm__ volatile("ecall");

    uint64 retVal;
    __asm__ volatile("mv %0, a0" : "=r" (retVal));

    return (int) retVal;

}

//----------------------------KRAJ NITI--------------------------------------

//----------------------------SEMAFORI---------------------------------------

int sem_open (sem_t* handle, unsigned init) {

    __asm__ volatile("mv a2, %0" : : "r" ((uint64) init));
    __asm__ volatile("mv a1, %0" : : "r" ((uint64) handle));
    __asm__ volatile("li a0, 0x21");

    __asm__ volatile("ecall");

    uint64 retVal;
    __asm__ volatile("mv %0, a0" : "=r" (retVal));

    return (int) retVal;

}

int sem_close (sem_t handle) {

    __asm__ volatile("mv a1, %0" : : "r" ((uint64) handle));
    __asm__ volatile("li a0, 0x22");

    __asm__ volatile("ecall");

    uint64 retVal;
    __asm__ volatile("mv %0, a0" : "=r" (retVal));

    return (int) retVal;

}

int sem_wait (sem_t handle) {
    __asm__ volatile("mv a1, %0" : : "r" ((uint64) handle));
    __asm__ volatile("li a0, 0x23");

    __asm__ volatile("ecall");

    uint64 retVal;
    __asm__ volatile("mv %0, a0" : "=r" (retVal));

    return (int) retVal;
}

int sem_signal (sem_t handle) {
    __asm__ volatile("mv a1, %0" : : "r" ((uint64) handle));
    __asm__ volatile("li a0, 0x24");

    __asm__ volatile("ecall");

    uint64 retVal;
    __asm__ volatile("mv %0, a0" : "=r" (retVal));

    return (int) retVal;
}

//----------------------------KRAJ SEMAFORA----------------------------------



//----------------------------NEIMPLEMENTIRANI DEO---------------------------
//----------------------------PERIODICNE NITI--------------------------------
int time_sleep (time_t){return 0;}
//---------------------------KRAJ PERIODICNIH NITI---------------------------
//---------------------------KONOZLA-----------------------------------------
char getc () {

    __asm__ volatile("li a0, 0x41");
    __asm__ volatile("ecall");
    uint64 retVal;
    __asm__ volatile("mv %0, a0" : "=r" (retVal));
    char c = (char) retVal;

    return c;
}
void putc (char c) {
    __asm__ volatile("mv a1, %0" : : "r" ((uint64) c));
    __asm__ volatile("li a0, 0x42");
    __asm__ volatile("ecall");
}
//---------------------------KRAJ KONZOLE------------------------------------
//----------------------------KRAJ NEIMPLEMENTIRANOG DELA--------------------
