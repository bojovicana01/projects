//
// Created by os on 8/10/23.
//

#ifndef PROJECT_BASE_V1_1_SCHEDULER_HPP
#define PROJECT_BASE_V1_1_SCHEDULER_HPP

#endif //PROJECT_BASE_V1_1_SCHEDULER_HPP

#include "../h/MemoryAllocator.hpp"

class TCB;

class Scheduler {

    static Scheduler* schedulerInstance;

    Scheduler();

    static int flagScheduler;

public:

    static Scheduler* getSchedulerInstance();

    void schedulerPut(TCB*);
    TCB* schedulerGet();

protected:

    static TCB* schedulerHead;
    static TCB* schedulerTail;

};