import { Student } from './../students/Student';
import { describe, it, expect } from "vitest";


describe("Student Entity", () => {
  it("should create a student with correct properties", () => {
    const student = new Student(
      "s1",                      
      "Vanesa",                   
      "vanesasoria@gmail.com",    
      "u1",                       
      new Date("2000-01-01"),     
      "WHITE",                    
      "123456789"                 
    );

    expect(student.id).toBe("s1");
    expect(student.name).toBe("Vanesa");
    expect(student.email).toBe("vanesasoria@gmail.com");
    expect(student.userId).toBe("u1");
    expect(student.birthDate).toEqual(new Date("2000-01-01"));
    expect(student.belt).toBe("WHITE");
    expect(student.phone).toBe("123456789");
    expect(student.createdAt).toBeInstanceOf(Date);
  });

  it("should default belt to WHITE if not provided", () => {
    const student = new Student(
      "s2",
      "Juan",
      "juan@gmail.com",
      "u2",
      new Date("2000-01-01")
    );

    expect(student.belt).toBe("WHITE");
  });

  it("should accept birthDate as string and convert it to Date", () => {
    const student = new Student(
      "s3",
      "Ana",
      "ana@gmail.com",
      "u3",
      "2000-01-01"
    );

    expect(student.birthDate).toBeInstanceOf(Date);
    expect(student.birthDate.toISOString()).toContain("2000-01-01");
  });

  it("should throw an error for invalid birth date", () => {
    expect(() => {
      new Student(
        "s4",
        "Carlos",
        "carlos@gmail.com",
        "u4",
        "invalid-date"
      );
    }).toThrowError("Invalid birth date");
  });
});
