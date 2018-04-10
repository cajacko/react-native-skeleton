# Components Folder

Inside the components folder, we group the files by module/feature.

In a CRUD of user, we would have only the module User. So, our structure would be as the following:

src
└─ components
└─ User
├─ Form.jsx
└─ List.jsx

When a component is composed by more than one file, we put this component and its files in a folder with the same name. Eg: Let’s say you have a Form.css containing the Form.jsx’s styles. In this case, your structure would be like that:

src
└─ components
└─ User
├─ Form
│ ├─ Form.jsx
│ └─ Form.css
└─ List.jsx
