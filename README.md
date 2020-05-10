# interface - A React Material Diagramming UI

* MaterialUI, Redux, React-DnD, Dagre
* Adhering to a JSX functional component style
* Built to depend on a Python Flask backend
* Initialized from Create React App (CRA)
* React Storybook used for component development

## Quickstart

Dependencies: Node (TODO install link)

* Clone the repository and `cd` into the directory
* Run `npm install` (populates your `node_modules/` based on `package.json`)
* Run `npm run start` to initiate the dev server

## Structure

* Attempting to be a fairly standard JS-style repository
  * `src` contains all the authored code
    * `src/components` for visual UI components
    * `src/operations` for most anything axios related (calls to Flask)
    * `src/stories` for React storybook
  * `public` contains the boilerplate from CRA
  * `archive` has deprecated code lazily kept around for a limited duration
* Standalone files
  * The config file for Node: `package.json`
    * A proxy line has been added at port 3333 for serving requests during development
  * `config-overrides.js` used by react-app-rewired to allow path shortcuts
    * e.g. @diagram for src/components/diagram  
  * TODO  `jsx_style.md` covers style
