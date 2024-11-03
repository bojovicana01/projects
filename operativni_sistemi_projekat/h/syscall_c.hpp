//
// Created by os on 8/4/23.
//

#ifndef PROJECT_BASE_V1_1_SYSCALL_C_HPP
#define PROJECT_BASE_V1_1_SYSCALL_C_HPP

#include "../lib/hw.h"
#include "TCB.hpp"
#include "MySemaphore.hpp"

//-------------------------MEMORIJA-----------------------------------------

void* mem_alloc (size_t size);
int mem_free (void*);

//-------------------------KRAJ MEMORIJE------------------------------------

//-------------------------NITI---------------------------------------------

int thread_create (thread_t* handle, void(*start_routine)(void*), void* arg);

int thread_exit ();

void thread_dispatch ();

void thread_join (thread_t handle);

// dodatni sistemski pozivi
int thread_create_2 (thread_t* handle, void(*start_routine)(void*), void* arg);

//-------------------------KRAJ NITI----------------------------------------

//----------------------------SEMAFORI---------------------------------------
int sem_open (sem_t* handle, unsigned init);
int sem_close (sem_t handle);
int sem_wait (sem_t id);
int sem_signal (sem_t id);
//----------------------------KRAJ SEMAFORA----------------------------------



//----------------------------NEIMPLEMENTIRANI DEO---------------------------
//----------------------------PERIODICNE NITI--------------------------------
//typedef unsigned long time_t;
int time_sleep (time_t);
//---------------------------KRAJ PERIODICNIH NITI---------------------------
//---------------------------KONOZLA-----------------------------------------
//const int EOF = -1;
char getc ();
void putc (char);
//---------------------------KRAJ KONZOLE------------------------------------
//----------------------------KRAJ NEIMPLEMENTIRANOG DELA--------------------

#endif //PROJECT_BASE_V1_1_SYSCALL_C_HPP
