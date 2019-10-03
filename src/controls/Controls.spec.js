import React, { useState } from "react";
import { render, fireEvent } from "@testing-library/react";

import Controls from './Controls.js';

test("that there are buttons provided to toggle the closed and locked states", () => {
    const { getAllByText } = render(<Controls />);

    const gateButtons = getAllByText(/gate/i);

    expect(gateButtons).toBeDefined();
});

test("button default state shows the correct text", () => {
    let mockState = {
        locked: false,
        closed: false
    }

    const mockToggleLocked = jest.fn();
    const mockToggleClosed = jest.fn();

    const { getAllByText } = render(<Controls closed={mockState.closed} locked={mockState.locked} toggleClosed={mockToggleClosed} toggleLocked={mockToggleLocked} />);
  
    const [toggleLockBtn, toggleCloseBtn] = getAllByText(/gate/i);
    
    fireEvent.click(toggleCloseBtn);
    expect(mockToggleClosed).toHaveBeenCalled();
    
    expect(toggleCloseBtn.textContent).toBe('Close Gate');
    expect(toggleLockBtn.textContent).toBe('Lock Gate');
    

});

test("closeGateBtn shows Open Gate and lockedGateBtn shows Unlock Gate if the mockStates are true", () => {
    let mockState = {
        locked: true,
        closed: true
    }

    const mockToggleLocked = jest.fn();
    const mockToggleClosed = jest.fn();

    const { getAllByText } = render(<Controls closed={mockState.closed} locked={mockState.locked} toggleClosed={mockToggleClosed} toggleLocked={mockToggleLocked} />);
  
    const [lockGateBtn, closeGateBtn] = getAllByText(/gate/i);

    fireEvent.click(lockGateBtn);
    expect(mockToggleLocked).toHaveBeenCalled();

    expect(lockGateBtn.textContent).toBe('Unlock Gate');
    expect(closeGateBtn.textContent).toBe('Open Gate');
});


test("the closed toggle button is disabled if the gate is locked", () => {
    const mockToggleClosed = jest.fn();

    const { getByText } = render(<Controls locked={true} toggleClosed={mockToggleClosed} />);

    const closeToggleBtn = getByText(/close gate/i);

    fireEvent.click(closeToggleBtn);

    expect(mockToggleClosed).not.toHaveBeenCalled();
})

test("the locked toggle button is disabled if the gate is open", () => {
    const mockToggleLocked = jest.fn();

    const { getByText } = render(<Controls closed={false} toggleLocked={mockToggleLocked} />);

    const lockToggleBtn = getByText(/lock gate/i);

    fireEvent.click(lockToggleBtn);

    expect(mockToggleLocked).not.toHaveBeenCalled();
})