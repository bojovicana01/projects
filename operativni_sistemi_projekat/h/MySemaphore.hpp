//
// Created by os on 8/18/23.
//

#ifndef PROJECT_BASE_V1_1_MYSEMAPHORE_HPP
#define PROJECT_BASE_V1_1_MYSEMAPHORE_HPP

#include "./TCB.hpp"

class MySemaphore {

    struct BlockedThread {

        BlockedThread* next;
        TCB* blockedThread;

    };

public:

    static MySemaphore* allocateSemaphore(unsigned init);
    static int deallocateSemaphore(MySemaphore* handle);

    int wait();
    int signal();

    int value() { return val; }

protected:
    void block();
    void unblock();

    int val;

private:
    BlockedThread* blockedSemHead;
    BlockedThread* blockedSemTail;

};

typedef MySemaphore* sem_t;

#endif //PROJECT_BASE_V1_1_MYSEMAPHORE_HPP
