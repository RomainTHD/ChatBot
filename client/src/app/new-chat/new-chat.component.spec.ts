import {
    ComponentFixture,
    TestBed,
} from "@angular/core/testing";

import {NewChatComponent} from ".";

describe("NewChatComponent", () => {
    let component: NewChatComponent;
    let fixture: ComponentFixture<NewChatComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NewChatComponent],
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture   = TestBed.createComponent(NewChatComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it("should create", () => {
        expect(component).toBeTruthy();
    });
});
