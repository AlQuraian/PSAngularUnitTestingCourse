import { of } from 'rxjs';

import { HeroesComponent } from './heroes.component';
import { Hero } from '../hero';

describe('HeroesComponent', () => {
  let component: HeroesComponent;
  let heroes: Hero[];
  let mockHeroService;

  beforeEach(() => {
    heroes = [
      { id: 1, name: 'SpiderDude', strength: 8 },
      { id: 2, name: 'Wonderful Woman', strength: 24 },
      { id: 3, name: 'SuperDude', strength: 55 }
    ];

    mockHeroService = jasmine.createSpyObj(['getHeroes', 'addHero', 'deleteHero']);

    component = new HeroesComponent(mockHeroService);
  });

  describe('delete', () => {

    it('should only remove the indicated hero from the heroes list', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = heroes;

      component.delete(heroes[2]);

      // expect(compoenent.heroes.length).toBe(2);

      expect(component.heroes.includes(heroes[2])).toBeFalsy();
      expect(
        component.heroes.includes(heroes[0]) &&
        component.heroes.includes(heroes[1])
      ).toBeTruthy();
    });

    it('should call deleteHero', () => {
      mockHeroService.deleteHero.and.returnValue(of(true));
      component.heroes = heroes;

      component.delete(heroes[2]);

      expect(mockHeroService.deleteHero).toHaveBeenCalledWith(heroes[2]);
    });
  });
});
