//
// Created by os on 8/4/23.
//

#ifndef PROJECT_BASE_V1_1_SYSCALL_CPP_HPP
#define PROJECT_BASE_V1_1_SYSCALL_CPP_HPP

#include "syscall_c.hpp"

//----------------------------MEMORIJA---------------------------------------

void* operator new (size_t);
void operator delete (void*);

void* operator new[](size_t);
void operator delete[](void*);

//----------------------------KRAJ MEMORIJE----------------------------------

//----------------------------NITI-------------------------------------------

class Thread {
    friend void runWrapper(void*);
public:
    Thread (void (*body)(void*), void* arg);
    virtual ~Thread ();
    int start ();
    void join();
    static void dispatch ();
    static int sleep (time_t);
protected:
    Thread ();
    virtual void run () {}
private:
    thread_t myHandle;
    void (*body)(void*); void* arg;
};

void runWrapper (void*);

//----------------------------KRAJ NITI--------------------------------------



//----------------------------NEIMPLEMENTIRANI DEO---------------------------
//----------------------------SEMAFORI---------------------------------------
class Semaphore {
public:
    Semaphore (unsigned init = 1);
    virtual ~Semaphore ();
    int wait ();
    int signal ();
private:
    sem_t myHandle;
};
//----------------------------KRAJ SEMAFORA----------------------------------
//----------------------------PERIODICNE NITI--------------------------------
class PeriodicThread : public Thread {
public:
    void terminate ();
protected:
    PeriodicThread (time_t period);
    virtual void periodicActivation () {}
private:
    time_t period;
};
//---------------------------KRAJ PERIODICNIH NITI---------------------------
//---------------------------KONOZLA-----------------------------------------
class Console {
public:
    static char getc ();
    static void putc (char);
};
//---------------------------KRAJ KONZOLE------------------------------------
//----------------------------KRAJ NEIMPLEMENTIRANOG DELA--------------------


#endif //PROJECT_BASE_V1_1_SYSCALL_CPP_HPP
