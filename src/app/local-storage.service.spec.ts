import { Employee } from "@manage-employees/shared/models";
import { LocalStorageService } from "@manage-employees/employee/data";
import { inject } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { of, take } from "rxjs";

describe("LocalStorageService", () => {
  let localStorageService: LocalStorageService<Employee>;
  beforeEach(() => {
    TestBed.configureTestingModule({});
    localStorageService = TestBed.inject(LocalStorageService<Employee>);
  });

  it('should be created', () => {
    expect(localStorageService).toBeTruthy();
  });
  it('Add employee', (done) => {
    const employee = { id: "", firstName: "Laurentiu", lastName: "Dobrescu", position: "Frontend", profilePicture: "" };
    const restul = localStorageService.add("employee", employee);
    restul.pipe(take(1)).subscribe((res: Employee) => {
      
      expect(res).toEqual(employee);
      done();
    })
    
  });
})
