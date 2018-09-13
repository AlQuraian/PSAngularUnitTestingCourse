import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroService } from './hero.service';
import { MessageService } from './message.service';

describe(HeroService.name, () => {
  let mockMessageService;
  let httpTestingController: HttpTestingController;
  let service: HeroService;

  beforeEach(() => {
    mockMessageService = jasmine.createSpyObj(['add']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HeroService,
        { provide: MessageService, useValue: mockMessageService }
      ]
    });

    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.get(HeroService);
  });


  describe('getHero', () => {

    it('should call get with the correct URL', () => {

      service.getHero(1).subscribe();

      const req = httpTestingController.expectOne('api/heroes/1');
      req.flush({ id: 1, name: 'SuperDude', strength: 100 });
      httpTestingController.verify(); // exactly one call to api/heroes/1 and no other urls
    });
  });
});
