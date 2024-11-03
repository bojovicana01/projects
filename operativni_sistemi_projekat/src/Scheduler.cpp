//
// Created by os on 8/10/23.
//

//#include "../h/Scheduler.hpp"
#include "../h/TCB.hpp"

Scheduler* Scheduler::schedulerInstance = nullptr;
int Scheduler::flagScheduler = 0;
TCB* Scheduler::schedulerHead = nullptr;
TCB* Scheduler::schedulerTail = nullptr;

Scheduler::Scheduler() = default;

Scheduler* Scheduler::getSchedulerInstance() {

    if (flagScheduler == 0) {
        flagScheduler = 1;

        uint64 wholeBlocks = sizeof (Scheduler) / MEM_BLOCK_SIZE;
        uint64 sizeNeeded = wholeBlocks + (uint64) ((wholeBlocks * MEM_BLOCK_SIZE == sizeof (Scheduler))?0:1);
        schedulerInstance = (Scheduler*) MemoryAllocator::getMemoryAllocatorInstance()->mem_alloc(sizeNeeded);
        // mozda je potrebno odmah da ubacimo jednu nit koja je besposlena da scheduler nikada ne bi bio prazan

    }

    return schedulerInstance;

}

void Scheduler::schedulerPut(TCB * newSchedEl) {

    if (Scheduler::schedulerTail) {
        Scheduler::schedulerTail->setNext(newSchedEl);
    }
    else {
        Scheduler::schedulerHead = newSchedEl;
    }
    Scheduler::schedulerTail = newSchedEl;

}

TCB* Scheduler::schedulerGet() {

    if (Scheduler::schedulerHead) {

        TCB* retVal = Scheduler::schedulerHead;

        Scheduler::schedulerHead = Scheduler::schedulerHead->getNext();
        if (Scheduler::schedulerHead == nullptr) Scheduler::schedulerTail = nullptr;

        return retVal;

    }
    else {
        return nullptr;
    }

}