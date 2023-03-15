import React from "react";
import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import CourseEditor from "../Pages/CourseEditor";


let request = require('supertest');
let app = require('../app');
let server;

beforeAll((done) => {
  server = app.listen(done);
});

afterAll((done) => {
  server.close(done);
});

describe("CourseEditor", () => {
  test("renders the course editor page", async () => {
    const originalWarn = console.warn;

    const useSelectorMock = jest.fn();
    useSelectorMock.mockReturnValue({ account: null });

    console.warn = (...args) => {
      if (args[0].includes("An update to ScreenViewer inside a test")) {
        return null;
      }
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
    const mockNavigate = jest.fn();
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

    await waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/login"));
  });
});




 request = require('supertest');
 app = require('../app');

describe('Course editor', () => {
  let cookie;
  beforeAll(async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'password' });
    cookie = response.headers['set-cookie'][0];
  });

  describe('when user is logged in', () => {
    it('should allow the user to access the course editor page', async () => {
      const response = await request(app)
        .get('/course-editor')
        .set('Cookie', cookie)
        .expect(200);
      expect(response.text).toContain('Course Editor');
    });

    it('should allow the user to edit a course', async () => {
      const response = await request(app)
        .post('/api/courses')
        .set('Cookie', cookie)
        .send({
          title: 'New course',
          description: 'This is a new course',
          price: 19.99,
        });
      const course = response.body;

      const editResponse = await request(app)
        .put(`/api/courses/${course.id}`)
        .set('Cookie', cookie)
        .send({
          title: 'Edited course',
          description: 'This is an edited course',
          price: 24.99,
        })
        .expect(200);
      expect(editResponse.body.title).toBe('Edited course');
      expect(editResponse.body.description).toBe('This is an edited course');
      expect(editResponse.body.price).toBe(24.99);
    });
  });

  describe('when user is not logged in', () => {
    it('should redirect to login page when accessing the course editor page', async () => {
      const response = await request(app)
        .get('/course-editor')
        .expect('Location', '/login')
        .expect(302);
    });

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
        .expect(401);
    });
  });
});
