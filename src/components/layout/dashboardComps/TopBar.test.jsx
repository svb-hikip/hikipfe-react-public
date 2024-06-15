/* eslint-disable no-undef */
import { render, screen, fireEvent, act } from "@testing-library/react";
import TopBar from "./TopBar";
import { signOut } from "aws-amplify/auth";

jest.mock("aws-amplify/auth", () => ({
  signOut: jest.fn(),
}));

describe("TopBar Component", () => {

  // Topbar render test
  test("renders TopBar and triggers setSidebarOpen on button click", () => {
    const setSidebarOpenMock = jest.fn();
    render(<TopBar setSidebarOpen={setSidebarOpenMock} />);

    const button = screen.getByRole("button", { name: /Open sidebar/i });
    fireEvent.click(button);

    expect(setSidebarOpenMock).toHaveBeenCalledTimes(1);
  });

  // search input reder test
  test("renders search input", () => {
    render(<TopBar setSidebarOpen={jest.fn()} />);

    const searchInput = screen.getByPlaceholderText("Search...");
    expect(searchInput).toBeInTheDocument();
  });

  // notification button reder test
  test("renders notification button", () => {
    render(<TopBar setSidebarOpen={jest.fn()} />);

    const notificationButton = screen.getByRole("button", {
      name: /View notifications/i,
    });
    expect(notificationButton).toBeInTheDocument();
  });

  // user menu handles test
  test("renders user menu and handles sign out", async () => {

    render(<TopBar setSidebarOpen={jest.fn()} />);

    const userMenuButton = screen.getByRole("button", { name: /Open user menu/i});
    await act(async () => {
      fireEvent.click(userMenuButton);
    });

    const signOutButton = screen.getByText("Sign out");
    await act(async () => {
      fireEvent.click(signOutButton);
    });
    
    expect(signOut).toHaveBeenCalledTimes(1);
  });
});
