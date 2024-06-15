// MobileSideBar.test.js
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MobileSideBar from "./MobileSideBar";

// Mock CommonSideBar component
jest.mock("./CommonSideBar", () => () => <div>CommonSideBar</div>);

describe("MobileSideBar component", () => {

  test("renders correctly when sidebar is open", () => {
    const mockSetSidebarOpen = jest.fn();
    const mockSidebarOpen = true;

    const { getByText } = render(
      <MemoryRouter>
        <MobileSideBar
          sidebarOpen={mockSidebarOpen}
          setSidebarOpen={mockSetSidebarOpen}
        />
      </MemoryRouter>
    );

    const closeButton = getByText("Close sidebar");
    expect(closeButton).toBeInTheDocument();

    const commonSidebarContent = getByText(/CommonSideBar/i);
    expect(commonSidebarContent).toBeInTheDocument();
  });

  test("calls setSidebarOpen with false when close button is clicked", () => {
    const mockSetSidebarOpen = jest.fn();
    const mockSidebarOpen = true;

    const { getByText } = render(
      <MemoryRouter>
        <MobileSideBar
          sidebarOpen={mockSidebarOpen}
          setSidebarOpen={mockSetSidebarOpen}
        />
      </MemoryRouter>
    );

    const closeButton = getByText("Close sidebar");
    fireEvent.click(closeButton);

    expect(mockSetSidebarOpen).toHaveBeenCalledWith(false);
  });

});
