#include "Simulatir.h"

statusMessage* Simulatir::createStatusMessage()
{
	static int id =1;
	id++;
	statusMessage* sm=new statusMessage(id,1,rand()%3+1);
	return sm;
}

discoverMessage* Simulatir::createDiscoverMessage()
{
	static int id = 100;
	id++;
	discoverMessage* dm = new discoverMessage(id, 2,rand() % 9500 + 500, rand() % 361, rand() % 1001);
	return dm;
}

void Simulatir::generateAndSendMessage()
{
	for (int i = 0; i < 10; i++)
	{
		(rand() % 2 + 1 == 1) ? buffer[i] = createStatusMessage(): buffer[i] = createDiscoverMessage();
		buffer[i]->print();
	}	
	for (int i = 0; i < 10; i++)
	{
		buffer[i]->parseBack();
		buffer[i]->parseMessage();
		buffer[i]->print();
		buffer[i]->~baseMessage();
	}
}
