#pragma once
#include "baseMessage.h"
#include <stdlib.h>
#include "statusMessage.h"
#include "discoverMessage.h"
class Simulatir
{
	protected:
		baseMessage* buffer[10];
	public:
		statusMessage* createStatusMessage();
		discoverMessage* createDiscoverMessage();
		void generateAndSendMessage();
};
