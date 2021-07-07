import React from "react";
import { render, fireEvent } from "@testing-library/react";

import Display from "./Display.js";
import Controls from '../controls/Controls.js';

test("default rendering of the gate should be unlocked and open", () => {
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

test("if it displays that the gate is open/closed and if it is locked/unlocked", () => {
    const mockState = {
        locked: true,
        closed: true
    }

    const { getByText } = render(<Display locked={mockState.locked} closed={mockState.closed} />)
    
    expect(getByText(mockState.locked ? /locked/i : /unlocked/i)).toBeDefined();
    expect(getByText(mockState.closed ? /closed/i : /open/i)).toBeDefined(); 
})

test("if it displays Closed when the closed prop is true and Open otherwise", () => {
    const mockState = {
        closed: true
    }
    const { getByText } = render(<Display closed={mockState.closed} />); 

    expect(getByText(mockState.closed ? /closed/i : /open/i)).toBeDefined(); 
});

test("if it displays locked when the locked prop is true and unlocked otherwise", () => {
    const mockState = {
        locked: false
    }
    const { getByText } = render(<Display locked={mockState.locked} />); 

    expect(getByText(mockState.locked ? /locked/i : /unlocked/i)).toBeDefined();
})

test("when gate is locked or closed use the red-led class", () => {
    const mockState = {
        locked: true,
        closed: true
    }

    const { getByText } = render(<Display locked={mockState.locked} closed={mockState.closed} />)
    
    const gateLocked = getByText(/locked/i);
    expect(gateLocked.classList.contains('red-led')).toBe(true);
    
    const gateClosed = getByText(/closed/i);
    expect(gateClosed.classList.contains('red-led')).toBe(true); 
});

test("when gate is unlocked or open use the green-led class", () => {
    const mockState = {
        locked: false,
        closed: false
    }

    const { getByText } = render(<Display locked={mockState.locked} closed={mockState.closed} />)

    const gateUnlocked = getByText(/unlocked/i);
    expect(gateUnlocked.classList.contains('green-led')).toBe(true);

    const gateOpen = getByText(/open/i);
    expect(gateOpen.classList.contains('green-led')).toBe(true);
})
