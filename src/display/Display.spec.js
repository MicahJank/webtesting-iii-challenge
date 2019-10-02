import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Display from "./Display.js";
import Controls from '../controls/Controls.js';

test("default rendering should be unlocked and open", () => {
    const mockState = {
        closed: false,
        locked: false
    }

    const { getByText } = render(<Display
            locked={mockState.locked}
            closed={mockState.closed}
            />);

    expect(getByText(/unlocked/i)).toBeDefined();
    expect(getByText(/open/i)).toBeDefined();
});


test("gate cannot be open if it is locked(i.e. the button should be disabled", () => {
    const mockToggleClosed = jest.fn();
    const { getByText } = render(<Controls 
                        locked={true}
                        closed={true}
                        toggleClosed={mockToggleClosed}
                        />)
    
    const openGateButton = getByText(/open gate/i);

    fireEvent.click(openGateButton);

    expect(mockToggleClosed).not.toHaveBeenCalled(); // since locked is true, the fireEvent should not work
});

test("gate cannot be closed if it is locked(i.e. the button should be disabled", () => {
    const mockToggleClosed = jest.fn();
    const { getByText } = render(<Controls 
                        locked={true}
                        closed={false}
                        toggleClosed={mockToggleClosed}
                        />)
    
    const closeGateButton = getByText(/close gate/i);

    fireEvent.click(closeGateButton);

    expect(mockToggleClosed).not.toHaveBeenCalled(); // since locked is true, the fireEvent should not work
})
