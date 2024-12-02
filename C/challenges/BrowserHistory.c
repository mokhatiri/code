#include <stdlib.h>
#include <assert.h>
#include <stdio.h>


typedef struct Page{
    char* url;
    struct Page* next;
    struct Page* prev;
    
}Page;

Page* makePage(char* url){

    Page* page = malloc(sizeof(Page));
    assert(page);

    page->url = url;
    page->next = NULL;
    page->prev = NULL;

    return page;

}

typedef struct BrowserHistory{
    Page* current;

} BrowserHistory;


BrowserHistory* browserHistoryCreate(char* homepage) {

    BrowserHistory* page = malloc(sizeof(BrowserHistory));
    assert(page);

    page->current = makePage(homepage);

    return page;
}

void browserHistoryVisit(BrowserHistory* obj, char* url) {

    Page* current = (obj->current->next);
    while(current != NULL){
        Page* next = current->next;
        free(current);
        current = next;
    }

    obj->current->next = makePage(url);
    obj->current->next->prev = obj->current;
    obj->current = obj->current->next;
    

}

char* browserHistoryBack(BrowserHistory* obj, int steps) {
    
    while((steps > 0 || steps < -9) && obj->current->prev != NULL){obj->current = obj->current->prev ; steps--;}
    return obj->current->url;

}

char* browserHistoryForward(BrowserHistory* obj, int steps) {
    
    while((steps > 0) && obj->current->next != NULL ){obj->current = obj->current->next ; steps--;}
    return obj->current->url;

}

void browserHistoryFree(BrowserHistory* obj) {

    browserHistoryBack(obj, -10);
    browserHistoryVisit(obj, NULL);
    free(obj->current->prev);
    free(obj->current);
    free(obj);

    }

int main() {
    BrowserHistory* obj = browserHistoryCreate("leet.com");

    browserHistoryVisit(obj, "youtube.com");
    browserHistoryVisit(obj, "google.com");
    browserHistoryVisit(obj, "gmail.com");
    browserHistoryVisit(obj, "facebook.com");


    char* param_2 = browserHistoryBack(obj, 2);
    printf("Back: %s\n", param_2);
    browserHistoryVisit(obj, "era.com");
    browserHistoryVisit(obj, "google.com");
    browserHistoryBack(obj, 2);
 
    char* param_3 = browserHistoryForward(obj, 1);
    printf("Forward: %s\n", param_3);
    browserHistoryVisit(obj, "you.com");
 
    browserHistoryFree(obj);

    return 0;
}