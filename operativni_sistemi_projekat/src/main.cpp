//
// Created by os on 8/4/23.
//

#include "../h/riscv.hpp"
#include "../h/syscall_cpp.hpp"

bool flagFinished = false;

extern void userMain();

//void funA() {
//    for (int i = 0; i < 10; i++) putc('a');
//}
//
//void funB(thread_t handle) {
//    thread_join(handle);
//    for (int i = 0; i < 10; i++) putc('b');
//}

void userMainWrapper(void* arg) {
    userMain();
    flagFinished = true;
}

void main() {


//    uint64 wholeBlocks = (sizeof (uint64) * DEFAULT_STACK_SIZE) / MEM_BLOCK_SIZE;
//    uint64 sizeNeeded = wholeBlocks + (uint64) ((wholeBlocks * MEM_BLOCK_SIZE == (sizeof (uint64) * DEFAULT_STACK_SIZE))?0:1);
//
//    uint64* stackMain = (uint64*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(sizeNeeded);

//    TCB* mainTCB = TCB::createThread(nullptr, nullptr, nullptr);
//    TCB::running = mainTCB;
//
//    Riscv::w_stvec((uint64) &Riscv::interrupt1);
//    Riscv::ms_sstatus(Riscv::BitMaskSstatus::SSTATUS_SIE);
//
//    userMain();
//    thread_t userMainThread;
//    thread_create(&userMainThread, userMainWrapper, nullptr);

    Riscv::w_stvec((uint64) &Riscv::interrupt1);
    Riscv::ms_sstatus(Riscv::BitMaskSstatus::SSTATUS_SIE);

    thread_t mainThread;
    thread_create_2(&mainThread, nullptr, nullptr);

    TCB::running = mainThread;

    thread_t userMainThread;
    thread_create(&userMainThread, userMainWrapper, nullptr);

//    while (!flagFinished)
//        thread_dispatch();

    thread_dispatch();
    thread_join(userMainThread);

}




