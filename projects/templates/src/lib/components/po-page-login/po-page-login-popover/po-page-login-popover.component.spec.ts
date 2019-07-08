
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { PoPageLoginPopoverComponent } from './po-page-login-popover.component';

import * as UtilFunctions from './../../../utils/util';
import { configureTestSuite } from '../../../util-test/util-expect.spec';
import { PoI18nPipe } from './../../../../../../ui/src/lib/services/po-i18n/po-i18n.pipe';

describe('ThPageLoginPopoverComponent: ', () => {
  let component: PoPageLoginPopoverComponent;
  let fixture: ComponentFixture<PoPageLoginPopoverComponent>;
  let nativeElement: any;

  configureTestSuite(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes([])],
      declarations: [
        PoI18nPipe,
        PoPageLoginPopoverComponent
      ]
    });
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PoPageLoginPopoverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    nativeElement = fixture.debugElement.nativeElement;
  });

  it('should be created', () => {
    expect(component instanceof PoPageLoginPopoverComponent).toBeTruthy();
  });

  describe('Properties: ', () => {

    it('p-recovery: should set recoveryType to `externalLink` if value type is string', () => {
      const url = 'http://www.portinari.com';
      component.recovery = url;

      expect(component.recovery).toBe(url);
      expect(component.recoveryType).toBe('externalLink');
    });

    it('p-recovery: should set `recoveryType` to `internalLink if value type is string`', () => {
      const url =  '/portinari';
      component.recovery = url;

      expect(component.recovery).toBe(url);
      expect(component.recoveryType).toBe('internalLink');
    });

    it('p-recovery: shouldn`t set `recoveryType` if value type is different from string`', () => {
      const url =  {url: 'url'};
      component.recovery = url;
      component.recoveryType = undefined;

      expect(component.recovery).toBe(url);
      expect(component.recoveryType).toBe(undefined);
    });

    it('p-selected-language: should call `getLiterals` with valid `value`', () => {
      spyOn(component, <any>'getLiterals');
      component.selectedLanguage = 'es';

      expect(component['getLiterals']).toHaveBeenCalledWith(component.selectedLanguage);
    });

    it('p-remaining-attempts: should call `getLiterals` with valid `value`', () => {
      spyOn(component, <any>'getLiterals');
      component.selectedLanguage = 'es';

      expect(component['getLiterals']).toHaveBeenCalledWith(component.selectedLanguage);
    });
  });

  describe('Methods: ', () => {

    it('ngOnInit: should call `getLiterals`', () => {
      spyOn(component, <any>'getLiterals');
      component.ngOnInit();
      expect(component['getLiterals']).toHaveBeenCalled();
    });

    it('getLiterals: should call `changeDetector.detectChanges`', () => {
      spyOn(UtilFunctions, <any>'browserLanguage').and.returnValue('en');
      spyOn(component['changeDetector'], 'detectChanges');
      component.remainingAttempts = 3;
      const expectedValue = 3;

      component['getLiterals']();

      expect(component.literalParams).toBe(expectedValue);
      expect(component['changeDetector'].detectChanges).toHaveBeenCalled();
    });

    it('onForgotPasswordClick: should emit forgotPassword with recovery as param', () => {
      component.recovery = { url: 'url'};

      spyOn(component.forgotPassword, 'emit');

      component.onForgotPasswordClick(component.recovery);

      expect(component.forgotPassword.emit).toHaveBeenCalledWith(component.recovery);
    });
  });

  describe('Template: ', () => {

    it('should have the class `po-page-login-popover-link-container` if `recovery` is true and has value.', () => {
      component.recovery = 'fakeUrl';

      fixture.detectChanges();

      expect(nativeElement.querySelector('.po-page-login-popover-link-container')).toBeTruthy();
    });

    it('should have the class `po-page-login-popover-link-container` if `recovery` is false and has no value.', () => {
      component.recovery = '';

      fixture.detectChanges();

      expect(nativeElement.querySelector('.po-page-login-popover-link-container')).toBeFalsy();
    });

    it('should create `.po-page-login-popover-link` with `routerLink` if `recoveryType` is `internalLink`', () => {
      component.recovery = '/home';
      component.recoveryType = 'internalLink';

      fixture.detectChanges();

      const recoveryLink = nativeElement.querySelector('.po-page-login-popover-link[ng-reflect-router-link="/home"]');
      expect(recoveryLink).toBeTruthy();
    });

    it('should create `.po-page-login-popover-link` with `href` if `recoveryType` is `externalLink`', () => {
      component.recovery = 'http://po.portinari.com.br';
      component.recoveryType = 'externalLink';

      fixture.detectChanges();

      const recoveryLink = nativeElement.querySelector('.po-page-login-popover-link[href="http://po.portinari.com.br"]');
      expect(recoveryLink).toBeTruthy();
    });

    it('should call `onForgotPasswordClick` if `recoveryType` is undefined', () => {
      component.recovery = {url: 'url'};
      component.recoveryType = undefined;

      spyOn(component, 'onForgotPasswordClick');

      fixture.detectChanges();

      const forgotPasswordLink = nativeElement.querySelector('.po-page-login-popover-link');
      forgotPasswordLink.click();

      expect(component.onForgotPasswordClick).toHaveBeenCalledWith(component.recovery);
    });

  });

});