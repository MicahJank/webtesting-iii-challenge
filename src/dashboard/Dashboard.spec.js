import React from "react";
import { render } from "@testing-library/react";

import Dashboard from './Dashboard.js'


test("Dashboard should show both the controls and the display", () => {
    const { getByTestId } = render(<Dashboard />);

    expect(getByTestId('displayPanel')).toBeDefined();
    expect(getByTestId('controlPanel')).toBeDefined(); 
})

