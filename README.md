# React Tree View

This project provides a hierarchical view of a company's staff structure, allowing you to visually display the company's organization. It includes features for detecting errors in the hierarchy, such as cyclic dependencies and staff reporting to non-existent managers.

## Features

- **Hierarchical Tree View**: Visualize the company’s organizational structure in a tree format.
- **Error Detection**:
  - Detect **cyclic dependencies** (where a staff member indirectly reports to themselves).
  - Detect **non-existent manager relationships** (where a staff member is assigned to a manager that does not exist in the database).

## Installation

1. Clone the repository or download the source code.

   ```bash
   git clone https://github.com/Zuby128/react-tree-view.git
   ```

2. Set up app.

   ```bash
   cd react-tree-view
   npm install
   npm run dev
   ```

### Running the Application

- The app will run on [http://localhost:5173](http://localhost:5173).
- The Tree View will display the hierarchical structure of the company based on the STAFFS data.

## Testing Error Scenarios

### Cyclic Dependency Error

To simulate a cyclic dependency, follow these steps:

- Open the `/fake-db/staffs.js` file.
- Modify the Id of one of the staff members to create a cycle. For example:
- Change the Id of staff with Id: 24 to 2.
- Save the file and refresh the app. The error for cyclic dependency will be displayed.

### Non-Existent Manager Error

To simulate a non-existent manager error, follow these steps:

- Open the `/fake-db/staffs.js` file.
- Assign a non-existent ManagerId to one of the staff members. For example, set the ManagerId to a number that doesn’t exist in the current staff list, such as 500.
- Save the file and refresh the app. The list of staff with non-existent managers will be displayed.

## Technologies Used

React: For building the user interface.
JavaScript (ES6): For logic and rendering.
HTML5 & CSS3: For basic structure and styling.
SVG Animation: For rendering a loading spinner while fetching data.
Customization:
You can customize the hierarchical data and the error detection rules by modifying the buildTree function inside src/helpers/buildTree.js. This function processes the raw staff data and applies logic to detect cycles and non-existent managers.
