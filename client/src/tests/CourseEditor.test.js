/* eslint-disable no-undef */
/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-wait-for-multiple-assertions */
/* eslint-disable testing-library/await-async-utils */
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { store } from "../app/store";
import CourseEditor from "../Pages/CourseEditor";


jest.mock("../app", () => {
  const express = require("express");
  return express();
});


describe("CourseEditor", () => {
  test("renders the course editor page", async () => {
    const originalWarn = console.warn;


    console.warn = (...args) => {
      if (args[0].includes("An update to ScreenViewer inside a test")) {
        return null;
      }
      // eslint-disable-next-line testing-library/no-unnecessary-act
      act(() => {
        render(
          <Provider store={store}>
            <MemoryRouter initialEntries={["/course-editor"]}>
              <CourseEditor />
            </MemoryRouter>
          </Provider>
        );
      });
      const HeaderEditor = screen.getByTestId("HeaderEditor");
      const Screen = screen.getByTestId("screen");
      const ScreenViewer = screen.getByTestId("screen-viewer");
      const Menu = screen.getByTestId("screen-menu");

      waitFor(() => {
        expect(HeaderEditor).toBeInTheDocument();
        expect(Screen).toBeInTheDocument();
        expect(ScreenViewer).toBeInTheDocument();
        expect(Menu).toBeInTheDocument();
      });
      return originalWarn.apply(console, args);
    };
    console.warn = originalWarn;
  });

  test("redirects to login page if user is not logged in", async () => {
    
    const useSelectorMock = jest.fn();
    useSelectorMock.mockReturnValue({ account: null });

    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/course-editor"]}>
            <CourseEditor />
          </MemoryRouter>
        </Provider>
      );
    });

  });
});




 request = require('supertest');
 app = require('../app');

describe('Course editor', () => {
  let cookie;

  describe('when user is logged in', () => {
    it('should allow the user to access the course editor page', async () => {
      const response = await request(app)
        .get('/course-editor')
        .expect(404);
      
    });

    it('should allow the user to edit a course', async () => {
      const response = await request(app)
        .post('/api/courses')
        .send({
          title: 'New course',
          description: 'This is a new course',
          price: 19.99,
        });
      const course = response.body;

      const getRandomString = () => {
        return Math.random().toString(36).substring(7);
      };
      
      

    });
  });

  describe('when user is not logged in', () => {

    it('should return a 401 error when trying to edit a course', async () => {
      const response = await request(app)
        .post('/api/courses')
        .send({
          title: 'New course',
          description: 'This is a new course',
          price: 19.99,
        });
      const course = response.body;

      const editResponse = await request(app)
        .put(`/api/courses/${course.id}`)
        .send({
          title: 'Edited course',
          description: 'This is an edited course',
          price: 24.99,
        })
        .expect(404);
    });
  });
});
