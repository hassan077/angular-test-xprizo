import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WalletTileComponent } from './wallet-tile.component';

describe('WalletTileComponent', () => {
  let component: WalletTileComponent;
  let fixture: ComponentFixture<WalletTileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WalletTileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WalletTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
