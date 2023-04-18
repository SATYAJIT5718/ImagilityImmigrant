export const MyAccountData = [
  {
    id: 1,
    componentType: 'TimelineCard',
    title: 'Beneficiary Details',
    navigation: 'PersonalDetails',
    iconName: 'filetext1',
  },
  {
    id: 2,
    componentType: 'YourLifeStoryTimelines',
    title: 'Your life story in 3 timelines',
    navigation: 'YourLifeStoryTimelines',
    iconName: 'filetext1',
  },
  {
    id: 3,
    componentType: 'TimelineCard',
    title: 'Family Details',
    navigation: 'FamilyDetails',
    iconName: 'filetext1',
  },
  {
    id: 4,
    componentType: 'TimelineCard',
    title: 'Other Dependant Details',
    navigation: 'OtherDependantDetails',
    iconName: 'filetext1',
  },
  {
    id: 5,
    componentType: 'TimelineCard',
    title: 'Documents',
    navigation: 'Documents',
    iconName: 'filetext1',
  },
];
export const YourLifeStory = [
  {
    id: 1,
    componentType: 'TimelineCard',
    title: 'Education',
    navigation: 'Education',
    iconName: 'filetext1',
  },
  {
    id: 2,
    componentType: 'TimelineCard',
    title: 'Work Experiance',
    navigation: 'WorkExperience',
    iconName: 'filetext1',
  },
  {
    id: 3,
    componentType: 'TimelineCard',
    title: 'Immigration',
    navigation: 'ImmigratationDetailsListView',
    iconName: 'filetext1',
  },
];
export const EducationDetails = [
  {
    id: 1,
    componentType: 'TimelineCard',
    title: 'Educational Details',
    navigation: 'EducationalDetailsListView',
    iconName: 'filetext1',
  },
  {
    id: 2,
    componentType: 'TimelineCard',
    title: 'Training Details',
    navigation: 'TrianingDetailsListView',
    iconName: 'filetext1',
  },
  {
    id: 3,
    componentType: 'TimelineCard',
    title: 'License Or Certifications Details',
    navigation: 'CertificationsDetailsListView',
    iconName: 'filetext1',
  },
];
export const DegreeDetailsData = {
  title: 'Education Details',
  fields: [
    {
      name: 'Degree Details',
      expanded: true,
      contents: [
        {
          id: 11,
          view: 'multi',
          content: [
            {
              id: 20,
              name: 'degree',
              label: 'Degree',
              type: 'text',
              placeholder: 'Enter Degree',
              required: true,
              errorTile: 'Degree',
              value: 'B.Tech',
            },
            {
              id: 21,
              name: 'sasda',
              label: 'asdasd',
              type: 'text',
              placeholder: 'Enter Degree',
              required: true,
              errorTile: 'Degree',
              value: 'B.Tech',
            },
          ],
        },
        {
          id: 12,
          view: 'single',
          content: [
            {
              name: 'fieldOfStudy', //payload name
              label: 'Field Of Study', // title / label name
              type: 'text', // input type
              placeholder: 'Enter Field Of Study',
              secureTextEntry: false,
              required: true,
              errorTile: 'Field Of Study',
              value: '',
            },
          ],
        },
        {
          id: 13,
          view: 'single',
          content: [
            {
              name: 'grade', //payload name
              label: 'Grade', // title / label name
              type: 'text', // input type
              placeholder: 'Enter Grade',
              secureTextEntry: false,
              required: false,
              errorTile: 'Grade',
              value: '',
            },
          ],
        },
      ],
    },
  ],
};
