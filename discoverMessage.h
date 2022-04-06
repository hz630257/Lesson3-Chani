#pragma once
#include "baseMessage.h"
class discoverMessage :public baseMessage
{
protected:	
	float distance;// (500 - 10000)
	float angle;//(0 - 360)
	float speed;//(0 - 1000)
public:
	void parseMessage();
	void parseBack();
	void print();
	discoverMessage(int messageId, int messageType, float distance, float angle, float speed);
	discoverMessage();
	~discoverMessage();
};

