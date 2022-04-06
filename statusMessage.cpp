#include "statusMessage.h"
#include <stdlib.h>
#include <stdio.h>
#include <iostream>

void statusMessage::parseMessage()
{
	if (!this->messageBuffer)
		return;
	std::memcpy(&(this->messageType), this->messageBuffer, 2);
	std::memcpy(&(this->status), this->messageBuffer+2, 1);
}

void statusMessage::parseBack()
{
	this->messageBuffer = (unsigned char*)malloc(3);
	std::memcpy( this->messageBuffer, & (this->messageType), 2);
	std::memcpy(this->messageBuffer + 2, &(this->status), 1);
}

void statusMessage::print()
{
	std::cout << "inform about your messege:" << "\n";
	std::cout << "Type:	"<<this->messageType<<"\t"<< "Status:	" << this->status << "\n";
}

statusMessage::statusMessage(int messageId,int messageType,short status):baseMessage(messageId,messageType)
{
	this->status = (status < 1 || status>3) ?  0 : status;
}


