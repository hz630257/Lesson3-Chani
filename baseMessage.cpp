#include "baseMessage.h"

void baseMessage::parseBack()
{

}

unsigned char* baseMessage::getMessageBuffer()
{
	return this->messageBuffer;
}

baseMessage::baseMessage(int messageId, int messageType)
{
	this->messageId = messageId;
	if(messageType==1||messageType==2)
		this->messageType = messageType;
}
