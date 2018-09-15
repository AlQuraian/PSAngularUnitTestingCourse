import { NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of } from 'rxjs';

import { HeroesComponent } from './heroes.component';
import { HeroService } from '../hero.service';
import { HeroComponent } from '../hero/hero.component';
import { Hero } from '../hero';

describe('HeroesComponent (deep tests)', () => {

  let fixture: ComponentFixture<HeroesComponent>;
  let mockHeroService;
  let heroes: Hero[];

  beforeEach(() => {
    heroes = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 }
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    TestBed.configureTestingModule({
      declarations: [
        HeroesComponent,
        HeroComponent
      ],
      providers: [
        { provide: HeroService, useValue: mockHeroService }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    });

    fixture = TestBed.createComponent(HeroesComponent);
  });

  it('should render each hero as a HeroComponent', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));

    // run ngOnInit
    fixture.detectChanges();

    const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));
    expect(heroComponents.length).toBe(heroes.length);

    heroComponents.forEach((hero, i) => {
      expect(hero.componentInstance.hero).toEqual(heroes[i]);
    });
  });

  it(`should call heroService.deleteHero when the Hero Component's
  delete button us clicked`, () => {
      spyOn(fixture.componentInstance, 'delete');
      mockHeroService.getHeroes.and.returnValue(of(heroes));

      // run ngOnInit
      fixture.detectChanges();

      const heroComponents = fixture.debugElement.queryAll(By.directive(HeroComponent));

      // heroComponents[0].query(By.css('button'))
      //   .triggerEventHandler('click', { stopPropagation: () => { } });

      // heroComponents[0].triggerEventHandler('delete', undefined);

      // all above and this are the same for triggering events
      (heroComponents[0].componentInstance as HeroComponent).delete.emit();

      expect(fixture.componentInstance.delete).toHaveBeenCalledWith(heroes[0]);
    });

  it('should add a new hero to the hero list when the add button is clicked', () => {
    mockHeroService.getHeroes.and.returnValue(of(heroes));
    fixture.detectChanges();
    mockHeroService.addHero.and.returnValue(of({ id: 5, name, strength: 4 }));
    const inputElement = fixture.debugElement.query(By.css('input')).nativeElement;
    const addButton = fixture.debugElement.queryAll(By.css('button'))[0];

    inputElement.value = name;
    addButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    // contains all html code of child components
    const heroText = fixture.debugElement.query(By.css('ul')).nativeElement.textContent;
    expect(heroText).toContain(name);
  });

});
