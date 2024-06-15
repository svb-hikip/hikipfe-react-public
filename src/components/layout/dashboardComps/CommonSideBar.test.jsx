// CommonSideBar.test.js
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import CommonSideBar from "./CommonSideBar";
import { navigation, teams, settings } from "./menuItems"; // Actual imports

describe("CommonSideBar", () => {
  // Navigation items
  test("renders navigation items", () => {
    const { getByText } = render(
      <MemoryRouter>
        <CommonSideBar />
      </MemoryRouter>
    );

    navigation.forEach((item) => {
      expect(getByText(item.name)).toBeInTheDocument();
    });
  });

  // Team items
  test("renders teams", () => {
    const { getByText } = render(
      <MemoryRouter>
        <CommonSideBar />
      </MemoryRouter>
    );

    teams.forEach((team) => {
      expect(getByText(team.name)).toBeInTheDocument();
    });
  });

  // Settings items
  test("renders settings", () => {
    const { getByText } = render(
      <MemoryRouter>
        <CommonSideBar />
      </MemoryRouter>
    );

    expect(getByText(settings.name)).toBeInTheDocument();
  });
});
