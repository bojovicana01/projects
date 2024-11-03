//
// Created by os on 8/4/23.
//

#ifndef PROJECT_BASE_V1_1_MEMORYALLOCATOR_HPP
#define PROJECT_BASE_V1_1_MEMORYALLOCATOR_HPP

#include "../lib/hw.h"

struct FreeMemory {
    FreeMemory* next;
    FreeMemory* prev;
    size_t size;
};

class MemoryAllocator {
    static MemoryAllocator* ma;

    static int flagInit;

    MemoryAllocator();

    static FreeMemory* headFM;

    int tryJoiningFreeSegments(FreeMemory* segment);

public:
    static MemoryAllocator* getMemoryAllocatorInstance(); // u drugom kodu sam umesto MemoryAllocator* stavila MemoryAllocator& da se vraca

    void* mem_alloc (size_t size);
    int mem_free (void* toFree);

private:

    MemoryAllocator(const MemoryAllocator&) = delete;
    MemoryAllocator(MemoryAllocator&&) = delete;
    MemoryAllocator& operator=(const MemoryAllocator&) = delete;
    MemoryAllocator& operator=(MemoryAllocator&&) = delete;

};

#endif //PROJECT_BASE_V1_1_MEMORYALLOCATOR_HPP
