For this game there would be two components:
- App
    - Renders the board
- Board
    - Default to a certain number of rows and columns, but would take rows and columns as props.
    - Render the Light components in a grid as described by the props
    - Passes the toggle function to each of the created lights
- Light
    - Very basic, just has the "On" boolean, its coordinates as the id, and `onclick = {toggle}` given to it from its parent