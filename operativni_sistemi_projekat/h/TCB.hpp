//
// Created by os on 8/9/23.
//

#ifndef PROJECT_BASE_V1_1_TCB_HPP
#define PROJECT_BASE_V1_1_TCB_HPP

#include "../lib/hw.h"
#include "../h/Scheduler.hpp"

class TCB
{
public:

    static void idleFun(void*);

    bool getFlagSemaphoreValue();
    void setFlagSemaphoreTrue();
    void setFlagSemaphoreFalse();
    static void switchContextFromOutside(TCB* oldTCB, TCB* newTCB);

    void queueForJoinPut(TCB*);
    void queueForJoinRelease();

    static void join(TCB*);

    static void exitThread();

    bool isFinished();

    void setFinished(bool value);

    uint64 getTimeSlice(); // a

    using Body = void (*)(void*);

    static TCB *createThread(Body body, void* arg, uint64* stack);

    static TCB *createThread2(Body body, void* arg, uint64* stack);

    static void deallocateThread(TCB* thread);

    static void yield();

    static TCB *running;

    //------------------------------------------------------------------------------------------------------------------sta je neophodno za Scheduler

    void setNext(TCB* newNext);
    TCB* getNext();

    //------------------------------------------------------------------------------------------------------------------kraj sta je neophodno za Scheduler

private:

    struct Context
    {
        uint64 ra;
        uint64 sp;
    };

    struct QueueElem {
        TCB* data;
        QueueElem* next;
    };

    QueueElem* queueForJoinHead;
    QueueElem* queueForJoinTail;

    Body body;
    uint64 *stack;
    Context context;
    uint64 timeSlice;
    bool finished;
    void* arg; // argumenti za poziv bodyja

    friend class Riscv;

    static void threadWrapper();

    static void contextSwitch(Context *oldContext, Context *runningContext);

    static void dispatch();

    static uint64 timeSliceCounter;

    static uint64 constexpr STACK_SIZE = 1024;
    static uint64 constexpr TIME_SLICE = 2;

    //------------------------------------------------------------------------------------------------------------------sta je neophodno za Scheduler

    TCB* next = nullptr;

    //------------------------------------------------------------------------------------------------------------------kraj sta je neophodno za Scheduler

    int flagSemaphore;
};

typedef TCB* thread_t;

#endif //PROJECT_BASE_V1_1_TCB_HPP
