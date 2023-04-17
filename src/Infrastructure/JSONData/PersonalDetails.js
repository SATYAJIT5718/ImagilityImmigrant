import {scale} from '../utils/screenUtility';
export const PersonalDetailsJSON = {
  title: 'Personal Details',
  fields: [
    {
      name: 'Personal Info',
      expanded: true,
      contents: [
        {
          id: 1,
          view: 'multi',
          content: [
            {
              id: 11,
              name: 'title',
              label: 'Title',
              type: 'dropdown',
              isOpenTitle: 'isTitleOpen',
              required: true,
              errorTile: 'Title',
              value: 'Mr.',
              data: [
                {
                  id: 1,
                  value: 'Mr.',
                  label: 'Mr.',
                },
                {
                  id: 2,
                  value: 'Mrs.',
                  label: 'Mrs.',
                },
                {
                  id: 3,
                  value: 'Ms',
                  label: 'Ms',
                },
                {
                  id: 4,
                  value: 'Others',
                  label: 'Others',
                },
              ],
            },
            {
              id: 12,
              name: 'firstName',
              label: 'First Name',
              type: 'text',
              placeholder: 'Enter',
              secureTextEntry: false,
              required: true,
              errorTile: 'First Name',
              value: 'satya',
            },
          ],
        },
        {
          id: 2,
          view: 'multi',
          content: [
            {
              id: 1,
              view: 'single',
              name: 'middleName', //payload name
              label: 'Middle Name', // title / label name
              type: 'text', // input type
              placeholder: 'Enter Middle Name',
              secureTextEntry: false,
              required: false,
              errorTile: 'Middle Name',
              value: 'jit',
            },
            {
              id: 2,
              view: 'single',
              name: 'lastName',
              label: 'Last Name',
              type: 'text',
              placeholder: 'Enter Last Name',
              secureTextEntry: false,
              required: true,
              errorTile: 'Last Name',
              value: 'Mahakud',
            },
          ],
        },
        {
          id: 3,
          view: 'single',
          name: 'gender',
          label: 'Gender',
          type: 'radio',
          value: 'MALE',
          required: true,
          errorTile: 'Gender',
          data: [
            {
              id: 15,
              value: 'MALE',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Male',
            },
            {
              id: 16,
              value: 'FEML',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Female',
            },
          ],
        },
        {
          id: 55,
          name: 'isAlias',
          type: 'alias',
          view: 'single',
          label: 'Do you have others name?',
          required: false,
          errorTile: 'Required',
          value: false,
          content: [
            {
              id: 1,
              name: 'aliasTitle',
              label: 'Title',
              type: 'dropdown',
              isOpenTitle: 'isAliasTitleOpen',
              required: true,
              placeholder: 'Select',
              errorTile: 'Alias Title',
              value: 'Mr.',
              data: [
                {
                  id: 1,
                  value: 'Mr.',
                  label: 'Mr.',
                },
                {
                  id: 2,
                  value: 'Mrs.',
                  label: 'Mrs.',
                },
                {
                  id: 3,
                  value: 'Ms',
                  label: 'Ms',
                },
                {
                  id: 4,
                  value: 'Others',
                  label: 'Others',
                },
              ],
            },
            {
              id: 2,
              name: 'aliasName',
              label: 'Alias Name',
              type: 'text',
              placeholder: 'Enter Alias Name',
              secureTextEntry: false,
              required: true,
              errorTile: 'Alias Name',
              value: 'alias full name',
            },
          ],
        },
        {
          id: 4,
          view: 'single',
          name: 'DOB',
          type: 'date',
          label: 'Date Of Birth',
          required: true,
          errorTile: 'Date Of Birth',
          placeholder: 'Select Date',
          value: '1994-01-05',
          isOpen: false,
          isOpenTitle: 'isDOBOpen',
        },
        {
          id: 5,
          view: 'single',
          name: 'phoneNumber',
          countryName: 'countryName',
          type: 'phoneInput',
          label: 'Phone Number',
          required: true,
          errorTile: 'Phone Number',
          value: '7978332065',
          selectedCountry: 'US',
        },
        {
          id: 6,
          view: 'single',
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Enter email',
          secureTextEntry: false,
          required: true,
          errorTile: 'Email',
          value: 'dummy@gmail.com',
        },
        {
          id: 7,
          view: 'single',
          type: 'text',
          name: 'SocialSecurityNumber',
          label: 'Social Security Number',
          placeholder: 'Enter Number',
          secureTextEntry: false,
          required: false,
          keyboardType: 'number-pad',
          errorTile: 'Social Security Number',
          value: '123456',
        },
        {
          id: 8,
          view: 'single',
          name: 'lpr',
          label: 'Are you a Lawful Permanent Residence?',
          type: 'radio',
          secureTextEntry: false,
          required: true,
          errorTile: 'Lawful Permanent Residence',
          value: 'Yes',
          data: [
            {
              id: 15,
              value: 'Yes',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Yes',
            },
            {
              id: 16,
              value: 'No',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'No',
            },
          ],
        },
        {
          id: 9,
          view: 'multi',
          type: 'multi',
          content: [
            {
              id: 17,
              view: 'single',
              name: 'GREscore',
              label: 'GRE Score',
              type: 'text',
              placeholder: 'Enter Number',
              secureTextEntry: false,
              required: true,
              errorTile: 'GRE Score',
              keyboardType: 'number-pad',
              value: '111222',
            },
            {
              id: 18,
              view: 'single',
              name: 'TOEFLscore',
              label: 'TOEFL Score',
              type: 'text',
              placeholder: 'Enter Number',
              secureTextEntry: false,
              required: true,
              errorTile: 'TOEFL Score',
              keyboardType: 'number-pad',
              value: '13456',
            },
          ],
        },
      ],
    },
    {
      name: 'Marital Status',
      expanded: false,
      contents: [
        {
          id: 1,
          view: 'single',
          name: 'maritalStatus',
          label: 'What is your current marital status ?',
          type: 'radio',
          required: true,
          errorTile: 'Marital Status',
          value: 'MARRIED',
          data: [
            {
              id: 19,
              value: 'SINGLE',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Single,never married',
            },
            {
              id: 20,
              value: 'MARRIED',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Married',
            },
            {
              id: 21,
              value: 'DIVORCED',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Divorced',
            },
            {
              id: 22,
              value: 'WIDOWED',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Widowed',
            },
            {
              id: 23,
              value: 'LEGALLYSEPARATED',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Legally Separated',
            },
            {
              id: 24,
              value: 'MARRIAGEANNUALLED',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Marriage Annualled',
            },
          ],
          content: [
            {
              id: 1,
              view: 'single',
              name: 'DOM',
              type: 'date',
              label: 'Date Of Marriage',
              required: true,
              errorTile: 'Date Of Marriage',
              placeholder: 'Select Date',
              isOpen: false,
              isOpenTitle: 'isDOMOpen',
              value: '',
            },
            {
              id: 2,
              view: 'single',
              name: 'countryOfMarriage',
              label: 'Country of Marriage',
              type: 'dropdown',
              required: true,
              errorTile: 'Country of Marriage',
              placeholder: 'Select',
              isOpenTitle: 'isCOMOpen',
              zIndex: 100,
              value: '',
              data: [
                {
                  id: 1,
                  value: 'dummy1',
                  label: 'dummy1',
                },
                {
                  id: 2,
                  value: 'dummy2',
                  label: 'dummy2',
                },
                {
                  id: 3,
                  value: 'dummy3',
                  label: 'dummy3',
                },
                {
                  id: 4,
                  value: 'dummy4',
                  label: 'dummy4',
                },
              ],
            },
            {
              id: 3,
              view: 'single',
              name: 'stateOfMarriage',
              label: 'State',
              type: 'dropdown',
              required: true,
              errorTile: 'State of Marriage',
              placeholder: 'Select',
              isOpenTitle: 'isSOMOpen',
              zIndex: 90,
              value: '',
              data: [
                {
                  id: 1,
                  value: 'dummy1',
                  label: 'dummy1',
                },
                {
                  id: 2,
                  value: 'dummy2',
                  label: 'dummy2',
                },
                {
                  id: 3,
                  value: 'dummy3',
                  label: 'dummy3',
                },
                {
                  id: 4,
                  value: 'dummy4',
                  label: 'dummy4',
                },
              ],
            },
            {
              id: 4,
              view: 'single',
              type: 'text',
              name: 'cityOfMarriage',
              label: 'City',
              placeholder: 'Enter',
              secureTextEntry: false,
              required: true,
              errorTile: 'City of Marriage',
              value: '',
            },
          ],
        },
      ],
    },
    {
      name: 'Current Address Details',
      expanded: false,
      contents: [
        {
          id: 1,
          view: 'single',
          name: 'caAddress1',
          label: 'Address1',
          type: 'text',
          placeholder: 'Enter',
          secureTextEntry: false,
          required: true,
          multiline: true,
          errorTile: 'Address1',
          value: 'Btm Layout',
        },
        {
          id: 2,
          view: 'single',
          name: 'caAddress2',
          label: 'Address2',
          type: 'text',
          placeholder: 'Enter',
          secureTextEntry: false,
          required: true,
          multiline: true,
          errorTile: 'Address2',
          value: 'jay bheem nagar',
        },
        {
          id: 3,
          view: 'single',
          name: 'caCountry',
          label: 'Country',
          type: 'dropdown',
          required: true,
          zIndex: 100,
          isOpenTitle: 'isOPENcacountry',
          errorTile: 'Country',
          placeholder: 'Select',
          value: 'dummy1',
          data: [
            {
              id: 1,
              value: 'dummy1',
              label: 'dummy1',
            },
            {
              id: 2,
              value: 'dummy2',
              label: 'dummy2',
            },
            {
              id: 3,
              value: 'dummy3',
              label: 'dummy3',
            },
            {
              id: 4,
              value: 'dummy4',
              label: 'dummy4',
            },
          ],
        },
        {
          id: 4,
          view: 'single',
          name: 'caState',
          label: 'State',
          type: 'dropdown',
          required: true,
          zIndex: 90,
          isOpenTitle: 'isOPENcastate',
          errorTile: 'State',
          placeholder: 'Select',
          value: 'dummy2',
          data: [
            {
              id: 1,
              value: 'dummy1',
              label: 'dummy1',
            },
            {
              id: 2,
              value: 'dummy2',
              label: 'dummy2',
            },
            {
              id: 3,
              value: 'dummy3',
              label: 'dummy3',
            },
            {
              id: 4,
              value: 'dummy4',
              label: 'dummy4',
            },
          ],
        },
        {
          id: 5,
          view: 'single',
          type: 'text',
          name: 'caCity',
          label: 'City',
          required: true,
          errorTile: 'City',
          placeholder: 'Enter',
          value: 'banglore',
        },
        {
          id: 6,
          view: 'single',
          type: 'text',
          name: 'caLocality',
          label: 'Locality',
          required: true,
          errorTile: 'Locality',
          placeholder: 'Enter',
          value: 'near silk board',
        },
        {
          id: 7,
          view: 'single',
          type: 'text',
          name: 'caPostalCode',
          label: 'Zip / Postal Code',
          placeholder: 'Enter',
          secureTextEntry: false,
          required: true,
          keyboardType: 'number-pad',
          errorTile: 'Postal Code',
          value: '123456',
        },
      ],
    },
    {
      name: 'Permanent Address Details',
      expanded: false,
      contents: [
        {
          id: 1,
          view: 'single',
          name: 'paAddress1',
          label: 'Address1',
          type: 'text',
          placeholder: 'Enter',
          secureTextEntry: false,
          required: true,
          multiline: true,
          errorTile: 'Address1',
          value: 'Ananta Nagar',
        },
        {
          id: 2,
          view: 'single',
          name: 'paAddress2',
          label: 'Address2',
          type: 'text',
          placeholder: 'Enter',
          secureTextEntry: false,
          errorTile: 'Address2',
          required: true,
          multiline: true,
          value: 'Mahisapat',
        },
        {
          id: 3,
          view: 'single',
          name: 'paCountry',
          label: 'Country',
          type: 'dropdown',
          required: true,
          zIndex: 100,
          isOpenTitle: 'isOPENpacountry',
          errorTile: 'Country',
          placeholder: 'Select',
          value: 'IN',
          data: [
            {
              id: 1,
              value: 'IN',
              label: 'India',
            },
            {
              id: 2,
              value: 'US',
              label: 'USA',
            },
            {
              id: 3,
              value: 'dummy3',
              label: 'dummy3',
            },
            {
              id: 4,
              value: 'dummy4',
              label: 'dummy4',
            },
          ],
        },
        {
          id: 4,
          view: 'single',
          name: 'paState',
          label: 'State',
          type: 'dropdown',
          required: true,
          zIndex: 90,
          isOpenTitle: 'isOPENpastate',
          errorTile: 'State',
          placeholder: 'Select',
          value: 'DKL',
          data: [
            {
              id: 1,
              value: 'DKL',
              label: 'Dhenkanal',
            },
            {
              id: 2,
              value: 'dummy2',
              label: 'dummy2',
            },
            {
              id: 3,
              value: 'dummy3',
              label: 'dummy3',
            },
            {
              id: 4,
              value: 'dummy4',
              label: 'dummy4',
            },
          ],
        },
        {
          id: 5,
          view: 'single',
          type: 'text',
          name: 'paCity',
          label: 'City',
          required: true,
          errorTile: 'City',
          placeholder: 'Enter',
          value: 'Dhenkanal',
        },
        {
          id: 6,
          view: 'single',
          type: 'text',
          name: 'paLocality',
          label: 'Locality',
          required: true,
          errorTile: 'Locality',
          placeholder: 'Enter',
          value: 'near NH-53',
        },
        {
          id: 7,
          view: 'single',
          type: 'text',
          name: 'paPostalCode',
          label: 'Zip / Postal Code',
          required: true,
          keyboardType: 'number-pad',
          errorTile: 'Postal Code',
          placeholder: 'Enter',
          value: '759001',
        },
      ],
    },
    {
      name: 'Foreign Address Details',
      expanded: false,
      contents: [
        {
          id: 1,
          view: 'single',
          name: 'foreignAddressDetails',
          label: '',
          type: 'radio',
          secureTextEntry: false,
          required: false,
          value: 'newFAddress',
          data: [
            {
              id: 17,
              value: 'uca',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Use my current address',
            },
            {
              id: 18,
              value: 'upa',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Use my permanent address',
            },
            {
              id: 19,
              value: 'newFAddress',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Add new foreign address',
            },
          ],
        },
        {
          id: 2,
          view: 'single',
          name: 'faAddress1',
          label: 'Address1',
          type: 'text',
          placeholder: 'Enter',
          value: '',
          secureTextEntry: false,
          required: false,
          multiline: true,
        },
        {
          id: 3,
          view: 'single',
          name: 'faAddress2',
          label: 'Address2',
          type: 'text',
          placeholder: 'Enter',
          value: '',
          secureTextEntry: false,
          required: false,
          multiline: true,
        },
        {
          id: 4,
          view: 'single',
          name: 'faCountry',
          label: 'Country',
          type: 'dropdown',
          required: false,
          placeholder: 'Select',
          zIndex: 100,
          isOpenTitle: 'isOPENfacountry',
          data: [
            {
              id: 1,
              value: 'dummy1',
              label: 'dummy1',
            },
            {
              id: 2,
              value: 'dummy2',
              label: 'dummy2',
            },
            {
              id: 3,
              value: 'dummy3',
              label: 'dummy3',
            },
            {
              id: 4,
              value: 'dummy4',
              label: 'dummy4',
            },
          ],
        },
        {
          id: 5,
          view: 'single',
          name: 'faState',
          label: 'State',
          type: 'dropdown',
          required: false,
          placeholder: 'Select',
          zIndex: 90,
          isOpenTitle: 'isOPENfastate',
          data: [
            {
              id: 1,
              value: 'dummy1',
              label: 'dummy1',
            },
            {
              id: 2,
              value: 'dummy2',
              label: 'dummy2',
            },
            {
              id: 3,
              value: 'dummy3',
              label: 'dummy3',
            },
            {
              id: 4,
              value: 'dummy4',
              label: 'dummy4',
            },
          ],
        },
        {
          id: 6,
          view: 'single',
          type: 'text',
          name: 'faCity',
          label: 'City',
          required: false,
          placeholder: 'Enter',
          value: '',
        },
        {
          id: 7,
          view: 'single',
          type: 'text',
          name: 'faLocality',
          label: 'Locality',
          required: false,
          placeholder: 'Enter',
          value: '',
        },
        {
          id: 8,
          view: 'single',
          type: 'text',
          name: 'faPostalCode',
          label: 'Zip / Postal Code',
          required: false,
          placeholder: 'Enter',
          keyboardType: 'number-pad',
          value: '',
        },
      ],
    },
    {
      name: 'Place of Birth',
      expanded: false,
      contents: [
        {
          id: 1,
          view: 'single',
          name: 'pobCountry',
          label: 'Country',
          type: 'dropdown',
          required: true,
          errorTile: 'Country',
          placeholder: 'Select',
          isOpenTitle: 'ispobcountry',
          zIndex: 100,
          value: 'IN',
          data: [
            {
              id: 1,
              value: 'IN',
              label: 'India',
            },
            {
              id: 2,
              value: 'dummy2',
              label: 'dummy2',
            },
            {
              id: 3,
              value: 'dummy3',
              label: 'dummy3',
            },
            {
              id: 4,
              value: 'dummy4',
              label: 'dummy4',
            },
          ],
        },
        {
          id: 2,
          view: 'single',
          name: 'pobState',
          label: 'State',
          type: 'dropdown',
          required: true,
          errorTile: 'State',
          placeholder: 'Select',
          isOpenTitle: 'ispobstate',
          zIndex: 90,
          value: 'DKL',
          data: [
            {
              id: 1,
              value: 'DKL',
              label: 'Dhenkanal',
            },
            {
              id: 2,
              value: 'dummy2',
              label: 'dummy2',
            },
            {
              id: 3,
              value: 'dummy3',
              label: 'dummy3',
            },
            {
              id: 4,
              value: 'dummy4',
              label: 'dummy4',
            },
          ],
        },
        {
          id: 3,
          view: 'single',
          type: 'text',
          name: 'pobCity',
          label: 'City',
          required: true,
          errorTile: 'City',
          placeholder: 'Enter',
          value: 'Dhenkanal',
        },
        {
          id: 4,
          view: 'single',
          name: 'citizenship',
          label: 'Citizenship',
          type: 'dropdown',
          required: true,
          errorTile: 'Citizenship',
          placeholder: 'Select',
          isOpenTitle: 'isOpenCitizenship',
          zIndex: 80,
          value: 'IN',
          data: [
            {
              id: 1,
              value: 'IN',
              label: 'India',
            },
            {
              id: 2,
              value: 'dummy2',
              label: 'dummy2',
            },
            {
              id: 3,
              value: 'dummy3',
              label: 'dummy3',
            },
            {
              id: 4,
              value: 'dummy4',
              label: 'dummy4',
            },
          ],
        },
      ],
    },
    {
      name: 'Biographic Information',
      expanded: false,
      contents: [
        {
          id: 1,
          view: 'single',
          name: 'ethnicity',
          label: 'Ethnicity',
          type: 'radio',
          secureTextEntry: false,
          required: true,
          errorTile: 'Ethnicity',
          value: 'HOL',
          data: [
            {
              id: 17,
              value: 'HOL',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Hispanic or Latino',
            },
            {
              id: 18,
              value: 'NHOL',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Not Hispanic or Latino',
            },
          ],
        },
        {
          id: 2,
          view: 'single',
          name: 'race',
          label: 'Race',
          type: 'radio',
          secureTextEntry: false,
          required: true,
          errorTile: 'Race',
          isOpenTitle: 'isRaceOpen',
          zIndex: 100,
          value: 'BOAA',
          data: [
            {
              id: 19,
              value: 'WHITE',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'White',
            },
            {
              id: 20,
              value: 'ASIAN',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Asian',
            },
            {
              id: 21,
              value: 'BOAA',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Black or African American',
            },
            {
              id: 22,
              value: 'NHOOPI',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Native Huwain or Other Pacific Islander',
            },
            {
              id: 23,
              value: 'AIOAN',
              uncheckedColor: 'grey',
              color: '#0089CF',
              title: 'Ameriacan Indian or Alaska Native',
            },
          ],
        },
        {
          id: 3,
          view: 'single',
          name: 'hairColour',
          label: 'Hair Colour',
          type: 'dropdown',
          required: true,
          errorTile: 'Hair Colour',
          placeholder: 'Select',
          isOpenTitle: 'isHairColourOpen',
          zIndex: 90,
          value: 'RED',
          data: [
            {id: 24, value: 'BALD', label: 'Blad(No Hair)'},
            {id: 25, value: 'BALCK', label: 'Black'},
            {id: 26, value: 'BLOND', label: 'Blond'},
            {id: 27, value: 'GREY', label: 'Grey'},
            {id: 28, value: 'RED', label: 'Red'},
            {id: 29, value: 'SANDY', label: 'Sandy'},
            {id: 30, value: 'WHITE', label: 'White'},
            {id: 31, value: 'OTHER', label: 'Unknown/Other'},
          ],
        },
        {
          id: 4,
          view: 'single',
          name: 'eyeColour',
          label: 'Eye Colour',
          type: 'dropdown',
          required: true,
          errorTile: 'Eye Colour',
          placeholder: 'Select',
          isOpenTitle: 'isEyeColourOpen',
          zIndex: 80,
          value: 'BLUE',
          data: [
            {id: 32, value: 'BLACK', label: 'Black'},
            {id: 33, value: 'BROWN', label: 'Brown'},
            {id: 34, value: 'BLUE', label: 'Blue'},
            {id: 35, value: 'GREY', label: 'Grey'},
            {id: 36, value: 'GREEN', label: 'Green'},
            {id: 37, value: 'HAZEL', label: 'Hazel'},
            {id: 38, value: 'MAROON', label: 'Maroon'},
            {id: 39, value: 'PINK', label: 'Pink'},
            {id: 40, value: 'OTHER', label: 'Unknown/Other'},
          ],
        },
        {
          id: 5,
          view: 'single',
          name: 'weight',
          label: 'Weight (in Pounds)',
          type: 'text',
          placeholder: 'Enter',
          secureTextEntry: false,
          required: true,
          errorTile: 'Weight',
          keyboardType: 'number-pad',
          value: '149',
        },
        {
          id: 6,
          view: 'single',
          name: 'height',
          label: 'Height (in Inches)',
          type: 'text',
          placeholder: 'Enter',
          secureTextEntry: false,
          required: true,
          errorTile: 'Height',
          keyboardType: 'number-pad',
          value: '81',
        },
        {
          id: 7,
          view: 'single',
          name: 'identification',
          label: 'Any marks of identification ?',
          type: 'text',
          placeholder: 'Enter',
          value: 'black mole left hand',
          secureTextEntry: false,
          required: false,
        },
      ],
    },
    {
      name: 'Passport Details',
      expanded: false,
      contents: [
        {
          id: 11,
          view: 'single',
          type: 'text',
          name: 'passportNumber',
          label: 'Passport Number',
          placeholder: 'Enter Passport Number',
          required: true,
          errorTile: 'Passport Number',
          value: '4315JK23',
        },
        {
          id: 12,
          view: 'single',
          type: 'text',
          name: 'IssuingAuthority',
          label: 'Issuing Authority',
          placeholder: 'Enter Issuing Authority',
          required: true,
          errorTile: 'Issuing Authority',
          value: 'India',
        },
        {
          id: 13,
          view: 'single',
          type: 'date',
          name: 'DateOfIssue',
          label: 'Date of Issue',
          title: 'Date of Issue',
          placeholder: 'Enter Date of Issue',
          isOpen: false,
          isOpenTitle: 'isDOIOpen',
          required: true,
          errorTile: 'Date of Issue',
          value: '2017-01-05',
        },
        {
          id: 14,
          view: 'single',
          type: 'date',
          name: 'DateOfExpiry',
          label: 'Date of Expiry',
          title: 'Date of Expiry',
          placeholder: 'Enter Date of Expiry',
          isOpen: false,
          isOpenTitle: 'isDOEOpen',
          required: true,
          errorTile: 'Date of Expiry',
          value: '2027-01-05',
        },
        {
          id: 15,
          view: 'single',
          type: 'button',
          name: 'Add the Photocopy of your passport',
          label: 'Add the Photocopy of your passport',
          title: 'Add the Photocopy of your passport',
          required: false,
          placeholder: 'Enter Add the Photocopy of your passport',
          value: '',
        },
      ],
    },
  ],
};
