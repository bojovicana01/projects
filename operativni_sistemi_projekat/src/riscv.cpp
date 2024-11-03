//
// Created by os on 8/7/23.
//

#include "../h/riscv.hpp"
#include "../h/MemoryAllocator.hpp"
#include "../h/syscall_cpp.hpp"
#include "../lib/console.h"
#include "../h/printk.hpp"

void Riscv::popSppSpie() {
    __asm__ volatile("csrw sepc, ra");
    __asm__ volatile("csrc sstatus,%0" :: "r" ((uint64)256));
    __asm__ volatile("sret");
}

void Riscv::handleInterrupt1() {

    uint64 regA3;
    __asm__ volatile("mv %0, a3" : "=r" (regA3));

    //------------------------------------------------------------------------------------------------------------------CUVANJE A REGISTARA

    //uint64 a0p; -> ne cuva se a0 jer kroz njega vracamo povratnu vrednost
//    uint64 a1p;
//    uint64 a2p;
//    uint64 a3p;
//    uint64 a4p;
//    uint64 a5p;
//    uint64 a6p;
//    uint64 a7p;
//
//    __asm__ volatile("mv %0, a1" : "=r" (a1p));
//    __asm__ volatile("mv %0, a2" : "=r" (a2p));
//    __asm__ volatile("mv %0, a3" : "=r" (a3p));
//    __asm__ volatile("mv %0, a4" : "=r" (a4p));
//    __asm__ volatile("mv %0, a5" : "=r" (a5p));
//    __asm__ volatile("mv %0, a6" : "=r" (a6p));
//    __asm__ volatile("mv %0, a7" : "=r" (a7p));

    //------------------------------------------------------------------------------------------------------------------KRAJ CUVANJA A REGISTARA

    uint64 scause = r_scause();

    if (scause == 0x8000000000000001UL) {

        uint64 volatile sstatus = r_sstatus();
        mc_sip(SIP_SSIP);
        w_sstatus(sstatus);

    }

    else if (scause == 0x0000000000000009UL || scause == 0x0000000000000008UL) { // IZUZETAK - Sistemski poziv iz sistemskog rezima

        // cuvanje sepc i sstatus ****************************************************************
        uint64 volatile sepc = r_sepc() + (uint64) 4;
        uint64 volatile sstatus = r_sstatus();
        // kraj cuvanja sepc i sstatus ***********************************************************

        // TRAZENJE UZROKA ECALL-A
        uint64 uzrok;
        __asm__ volatile("mv %0, a0" : "=r" (uzrok));

        // za asinhroni deo
//        uint64 yieldFlag;
//        __asm__ volatile("mv %0, a6" : "=r" (yieldFlag));
//        if (yieldFlag == 0x66) {
//            TCB::timeSliceCounter = 0;
//            TCB::dispatch();
//        }

        if (uzrok == 0x01) { // mem_alloc

            uint64 numOfBlocks;
            __asm__ volatile("mv %0, a1" : "=r" (numOfBlocks));

            char* allocatedSpace = (char*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(numOfBlocks);

            __asm__ volatile("mv a0, %0" : : "r" (allocatedSpace));

        }

        else if (uzrok == 0x02) { // mem_free

            uint64 arg;
            __asm__ volatile("mv %0, a1" : "=r" (arg));
            char* toFreePtr = (char*) arg;

            int retVal = MemoryAllocator::getMemoryAllocatorInstance()->mem_free(toFreePtr);

            __asm__ volatile("mv a0, %0" : : "r" (retVal));

        }

        else if (uzrok == 0x11) { // thread_create

            uint64 arg1, arg2, arg3;
            __asm__ volatile("mv %0, a1" : "=r" (arg1));
            __asm__ volatile("mv %0, a2" : "=r" (arg2));
            arg3 = regA3;

            TCB** handle = (TCB**) arg1;
            TCB::Body start_routine = (TCB::Body) arg2;
            void* arguments = (void*) arg3;

            uint64 wholeBlocks = (sizeof (uint64) * DEFAULT_STACK_SIZE) / MEM_BLOCK_SIZE;
            uint64 sizeNeeded = wholeBlocks + (uint64) ((wholeBlocks * MEM_BLOCK_SIZE == (sizeof (uint64) * DEFAULT_STACK_SIZE))?0:1);

            uint64* stack;
            stack = (uint64*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(sizeNeeded);

            *handle = TCB::createThread(start_routine, arguments, stack);

            uint64 retVal = 0;
            if (handle == nullptr) retVal = -1;

            __asm__ volatile("mv a0, %0" : : "r" (retVal));

        }

        else if (uzrok == 0x12) { // thread_exit

            TCB* oldRunning = TCB::running;

            TCB::exitThread();

            TCB* newRunning = TCB::running;

            uint64 retVal;
            if (oldRunning == newRunning) retVal = 0;
            else retVal = -1;

            __asm__ volatile("mv a0, %0" : : "r" (retVal));

        }

        else if (uzrok == 0x13) { // thread_dispatch
            TCB::yield();
            //TCB::dispatch();
        }

        else if (uzrok == 0x14) { // thread_join

            uint64 arg;
            __asm__ volatile("mv %0, a1" : "=r" (arg));
            TCB* handle = (TCB*) arg;

            TCB::join(handle);

        }

        else if (uzrok == 0x51) { // thread_create_2

            uint64 arg1, arg2, arg3;
            __asm__ volatile("mv %0, a1" : "=r" (arg1));
            __asm__ volatile("mv %0, a2" : "=r" (arg2));
            arg3 = regA3;

            TCB** handle = (TCB**) arg1;
            TCB::Body start_routine = (TCB::Body) arg2;
            void* arguments = (void*) arg3;

            uint64 wholeBlocks = (sizeof (uint64) * DEFAULT_STACK_SIZE) / MEM_BLOCK_SIZE;
            uint64 sizeNeeded = wholeBlocks + (uint64) ((wholeBlocks * MEM_BLOCK_SIZE == (sizeof (uint64) * DEFAULT_STACK_SIZE))?0:1);

            uint64* stack;
            stack = (uint64*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(sizeNeeded);

            *handle = TCB::createThread2(start_routine, arguments, stack);

            uint64 retVal = 0;
            if (handle == nullptr) retVal = -1;

            __asm__ volatile("mv a0, %0" : : "r" (retVal));

        }

        else if (uzrok == 0x41) { // getc

            char c;
            c = __getc();
            uint64 c64 = (uint64) c;
            __asm__ volatile("mv a0, %0" : : "r" (c64));

        }

        else if (uzrok == 0x42) { // putc

            uint64 arg;
            __asm__ volatile("mv %0, a1" : "=r" (arg));
            char c = (char) arg;

            __putc(c);

        }

        else if (uzrok == 0x21) { // sem_open

            uint64 arg1, arg2;
            __asm__ volatile("mv %0, a1" : "=r" (arg1));
            __asm__ volatile("mv %0, a2" : "=r" (arg2));

            MySemaphore** handle = (MySemaphore**) arg1;
            unsigned init = (unsigned) arg2;

            *handle = MySemaphore::allocateSemaphore(init);

            uint64 retVal = 0;
            if (*handle == nullptr) retVal = -1;

            __asm__ volatile("mv a0, %0" : : "r" (retVal));

        }

        else if (uzrok == 0x22) { // sem_close

            uint64 arg1;
            __asm__ volatile("mv %0, a1" : "=r" (arg1));

            MySemaphore* handle = (MySemaphore*) arg1;

            uint64 retVal = (uint64) MySemaphore::deallocateSemaphore(handle);

            __asm__ volatile("mv a0, %0" : : "r" (retVal));

        }

        else if (uzrok == 0x23) { // sem_wait

            uint64 arg1;
            __asm__ volatile("mv %0, a1" : "=r" (arg1));

            MySemaphore* handle = (MySemaphore*) arg1;

            uint64 retVal = (uint64) handle->wait();

            __asm__ volatile("mv a0, %0" : : "r" (retVal));

        }

        else if (uzrok == 0x24) { // sem_signal

            uint64 arg1;
            __asm__ volatile("mv %0, a1" : "=r" (arg1));

            MySemaphore* handle = (MySemaphore*) arg1;

            uint64 retVal = (uint64) handle->signal();

            __asm__ volatile("mv a0, %0" : : "r" (retVal));

        }



        // vracanje sepc i sstatus ***************************************************************
        w_sstatus(sstatus);
        w_sepc(sepc);
        // kraj vracanja sepc i sstatus **********************************************************

    }

    else if (scause == 0x8000000000000009UL)
    {
        console_handler();
    }

    else {

        printStringVezbe("scause else : ");
        printIntegerVezbe(r_scause());
        printStringVezbe("\n ");

        printStringVezbe("sstatus else : ");
        printIntegerVezbe(r_sstatus());
        printStringVezbe("\n ");

        printStringVezbe("sepc else : ");
        printIntegerVezbe(r_sepc());
        printStringVezbe("\n ");

        printStringVezbe("sip else : ");
        printIntegerVezbe(r_sip());
        printStringVezbe("\n ");

        while(1) {}

    }


    //------------------------------------------------------------------------------------------------------------------VRACANJE A REGISTARA

//    __asm__ volatile("mv a1, %0" : : "r" (a1p));
//    __asm__ volatile("mv a2, %0" : : "r" (a2p));
//    __asm__ volatile("mv a3, %0" : : "r" (a3p));
//    __asm__ volatile("mv a4, %0" : : "r" (a4p));
//    __asm__ volatile("mv a5, %0" : : "r" (a5p));
//    __asm__ volatile("mv a6, %0" : : "r" (a6p));
//    __asm__ volatile("mv a7, %0" : : "r" (a7p));

    //------------------------------------------------------------------------------------------------------------------KRAJ VRACANJA A REGISTARA

}

