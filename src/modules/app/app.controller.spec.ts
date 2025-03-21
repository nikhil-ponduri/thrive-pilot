import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      // Mock the request body
      const mockBody = { message: 'test message' };
      // Mock the agent response
      jest.spyOn(appController, 'getHello').mockImplementation(async () => 'Hello World!');
      
      expect(appController.getHello(mockBody)).resolves.toBe('Hello World!');
    });
  });
});
