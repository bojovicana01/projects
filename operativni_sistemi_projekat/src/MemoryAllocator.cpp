//
// Created by os on 8/4/23.
//

#include "../h/MemoryAllocator.hpp"

MemoryAllocator* MemoryAllocator::ma = nullptr;
int MemoryAllocator::flagInit = 0;
FreeMemory* MemoryAllocator::headFM = nullptr;

MemoryAllocator::MemoryAllocator() = default;


//----------------------------------------------------------------------------------------------------------------------getMemoryAllocatorInstance

MemoryAllocator* MemoryAllocator::getMemoryAllocatorInstance() {

    if (flagInit == 0) {

        flagInit = 1;

        ma = (MemoryAllocator *) HEAP_START_ADDR;
        FreeMemory *fm = (FreeMemory *) ((char *) HEAP_START_ADDR + sizeof(MemoryAllocator));

        fm->next = fm->prev = nullptr;
        fm->size = (((char*) HEAP_END_ADDR - (char*) HEAP_START_ADDR) - sizeof(MemoryAllocator));

        headFM = fm;

    }

    return ma;
}

//----------------------------------------------------------------------------------------------------------------------mem_alloc

void* MemoryAllocator::mem_alloc(size_t sizeInBlocks) {

    //ovde prebacujemo u bajtove velicinu koju zelimo da alociramo
    size_t size = sizeInBlocks * MEM_BLOCK_SIZE;
    //uint64 sizeOfAllocated = sizeInBlocks; // vidi da li je bolje da se cuva vel u blokovima ili u bajtovima zasad je sacuvano u bajtovima

    if (size == 0) return nullptr;

    FreeMemory* current = nullptr;

    if (headFM) {
        // trazimo slobodni blok koji moze da podrzi trazenu velicinu
        for (current = headFM; current->next != nullptr && current->size < size; current = current->next);

        if (current == nullptr) return nullptr; // visak provera

        // ako je kolicina alocirane memorije jednaka datom fragmentu ili ako ostaje slobodan fragment koji ne moze da podrzi velicinu FreeMemory strukture
        if (current->size - sizeof(uint64) == size ||
            (current->size - sizeof(uint64) > size && current->size - sizeof(uint64) - size < sizeof(FreeMemory))) {

            if (current->prev) current->prev->next = current->next;
            else headFM = current->next; // ova linija bi trebalo da postavi headFM na nullptr kada se popuni i poslednji slobodan fregment

            if (current->next) current->next->prev = current->prev;

            char* retAddr = (char*)((char*)current + sizeof(uint64));
            uint64* sizePtr = (uint64*) current;
            *sizePtr = size;

            return retAddr;

        }
        else if (current->size - sizeof(uint64) - size > sizeof(FreeMemory)) {

            char* retAddr = (char*)((char*)current + sizeof(uint64));
            uint64* sizePtr = (uint64*)current;

            FreeMemory* pom = current;

            if (current == headFM) {
                current = (FreeMemory*) ((char*)current + size + sizeof(uint64));
                current->next = pom->next;
                current->prev = pom->prev;
                current->size = pom->size - size - sizeof(uint64);

                headFM = current;
            }
            else {
                current = (FreeMemory*) ((char*)current + size + sizeof(uint64));
                current->next = pom->next;
                current->prev = pom->prev;
                current->size = pom->size - size - sizeof(uint64);
            }

            *sizePtr = size;

            return retAddr;

        }
        else {
            return nullptr;
        }

    }
    else { // nema prostora
        return nullptr;
    }


}
//----------------------------------------------------------------------------------------------------------------------tryJoiningFreeSegments

int MemoryAllocator::tryJoiningFreeSegments(FreeMemory *segment) { // spaja sa narednim elementom

    if (segment == nullptr) return 0;

    if (segment->next && (char*)segment + segment->size == (char*)segment->next) {

        segment->size += segment->next->size;
        segment->next = segment->next->next;
        if (segment->next) segment->next->prev = segment;

        return 1;
    }
    else {
        return 2;
    }

}

//----------------------------------------------------------------------------------------------------------------------mem_free

int MemoryAllocator::mem_free (void* toFree) {

    if (toFree == nullptr) return -1;

    char* addrOfAllocated = (char*) toFree;
    uint64* sizeOfAllocatedPtr = (uint64*) (addrOfAllocated - sizeof(uint64));
    uint64 sizeToFree = *sizeOfAllocatedPtr;

    char* addrFrom = addrOfAllocated - sizeof(uint64);
    uint64 sizeOfAll = sizeToFree + sizeof(uint64);


    FreeMemory* current = nullptr; // prethodnik segmenta koji pokusavamo da oslobodimo

    // naci mesto gde da se ubaci novi slobodni fragment
    if (headFM == nullptr || addrFrom < (char*)headFM) {
        current = nullptr; // ne postoji prethodni segment
    }
    else {
        for (current = headFM; current->next != nullptr && addrFrom > (char*)(current->next); current = current->next);
    }

    FreeMemory* newFree = (FreeMemory*) addrFrom;

    newFree->size = sizeOfAll;
    newFree->prev = current;

    if (current) newFree->next = current->next;
    else newFree->next = headFM;

    if (newFree->next) newFree->next->prev = newFree;
    if (current) current->next = newFree;

    tryJoiningFreeSegments(newFree);
    tryJoiningFreeSegments(current);

    // nakon sto smo spojili segmente moramo da updateujemo headFM
    if (current == nullptr) headFM = newFree; // proveri !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    return 0;

}