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
          type: 'multi',
          content: [
            {
              id: 11,
              name: 'title',
              label: 'Title',
              title: 'title',
              type: 'dropdown',
              required: true,
              errorTile: 'Title',
              isOpenTitle: 'isOpenTitle',
              placeholder: 'Select',
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
              placeholder: 'Enter First Name',
              secureTextEntry: false,
              required: true,
              errorTile: 'First Name',
              // value: 'satya',
              style: {
                backgroundColor: 'white',
                borderColor: '#C3D0DE',
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
                height: scale(40),
              },
            },
          ],
        },
        {
          id: 2,
          view: 'multi',
          type: 'multi',
          content: [
            {
              id: 13,
              view: 'single',
              name: 'middleName',
              label: 'Middle Name',
              type: 'text',
              placeholder: 'Enter Middle Name',
              secureTextEntry: false,
              required: false,
              style: {
                backgroundColor: 'white',
                borderColor: '#C3D0DE',
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
              },
            },
            {
              id: 14,
              view: 'single',
              name: 'lastName',
              label: 'Last Name',
              type: 'text',
              placeholder: 'Enter Last Name',
              secureTextEntry: false,
              required: true,
              errorTile: 'Last Name',
              style: {
                backgroundColor: 'white',
                borderColor: '#C3D0DE',
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
              },
            },
          ],
        },
        {
          id: 3,
          view: 'single',
          name: 'gender',
          label: 'Gender',
          type: 'radio',
          value: '',
          secureTextEntry: false,
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
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          },
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
          value: '',
          isOpen: false,
          isOpenTitle: 'isDOBOpen',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            flex: 1,
          },
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
        },
        {
          id: 6,
          view: 'single',
          name: 'email',
          label: 'Email',
          type: 'email',
          placeholder: 'Enter email',
          value: '',
          secureTextEntry: false,
          required: true,
          errorTile: 'Email',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          },
        },
        {
          id: 7,
          view: 'single',
          name: 'SocialSecurityNumber',
          label: 'Social Security Number',
          type: 'text',
          placeholder: 'Enter Number',
          secureTextEntry: false,
          required: false,
          keyboardType: 'number-pad',
          // value: 'satya',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
        },
        {
          id: 8,
          view: 'single',
          name: 'lpr',
          label: 'Are you a Lawful Permanent Residence?',
          type: 'radio',
          value: '',
          secureTextEntry: false,
          required: true,
          errorTile: 'LPR Status',
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
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          },
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
              style: {
                backgroundColor: 'white',
                borderColor: '#C3D0DE',
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
              },
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
              style: {
                backgroundColor: 'white',
                borderColor: '#C3D0DE',
                borderWidth: 1,
                borderRadius: 5,
                padding: 10,
                marginBottom: 10,
              },
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
          name: 'maritalstatus',
          label: 'What is your current marital status ?',
          type: 'radio',
          value: '',
          required: true,
          errorTile: 'Marital Status',
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
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          },
        },
        {
          id: 2,
          view: 'single',
          name: 'DOB',
          type: 'date',
          label: 'Date Of Marriage',
          required: true,
          errorTile: 'Date Of Marriage',
          placeholder: 'Select Date',
          value: '',
          isOpen: false,
          isOpenTitle: 'isDOMOpen',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            flex: 1,
          },
        },
        {
          id: 3,
          view: 'single',
          name: 'countryofmarriage',
          label: 'Country of Marriage',
          type: 'dropdown',
          required: true,
          errorTile: 'Country of Marriage',
          placeholder: 'Select',
          data: [],
        },
        {
          id: 4,
          view: 'single',
          name: 'stateofmarriage',
          label: 'State',
          type: 'dropdown',
          required: true,
          errorTile: 'State of Marriage',
          placeholder: 'Select',
          data: [],
        },
        {
          id: 5,
          view: 'single',
          type: 'text',
          name: 'cityofmarriage',
          label: 'City',
          required: true,
          errorTile: 'City of Marriage',
          placeholder: 'Enter',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
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
          name: 'caaddress1',
          label: 'Address1',
          type: 'text',
          placeholder: 'Enter',
          value: '',
          secureTextEntry: false,
          required: true,
          multiline: true,
          errorTile: 'Address1',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(60),
          },
        },
        {
          id: 2,
          view: 'single',
          name: 'caaddress2',
          label: 'Address2',
          type: 'text',
          placeholder: 'Enter',
          value: '',
          secureTextEntry: false,
          required: true,
          multiline: true,
          errorTile: 'Address2',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(60),
          },
        },
        {
          id: 3,
          view: 'single',
          name: 'cacountry',
          label: 'Country',
          type: 'dropdown',
          required: true,
          errorTile: 'Country',
          placeholder: 'Select',
          data: [],
        },
        {
          id: 4,
          view: 'single',
          name: 'castate',
          label: 'State',
          type: 'dropdown',
          required: true,
          errorTile: 'State',
          placeholder: 'Select',
          data: [],
        },
        {
          id: 5,
          view: 'single',
          type: 'text',
          name: 'cacity',
          label: 'City',
          required: true,
          errorTile: 'City',
          placeholder: 'Enter',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
        },
        {
          id: 6,
          view: 'single',
          type: 'text',
          name: 'calocality',
          label: 'Locality',
          required: true,
          errorTile: 'Locality',
          placeholder: 'Enter',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
        },
        {
          id: 7,
          view: 'single',
          type: 'text',
          name: 'capostalcode',
          label: 'Zip / Postal Code',
          required: true,
          errorTile: 'Postal Code',
          placeholder: 'Enter',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
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
          name: 'paaddress1',
          label: 'Address1',
          type: 'text',
          placeholder: 'Enter',
          value: '',
          secureTextEntry: false,
          required: true,
          multiline: true,
          errorTile: 'Address1',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(60),
          },
        },
        {
          id: 2,
          view: 'single',
          name: 'paaddress2',
          label: 'Address2',
          type: 'text',
          placeholder: 'Enter',
          value: '',
          secureTextEntry: false,
          errorTile: 'Address2',
          required: true,
          multiline: true,
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(60),
          },
        },
        {
          id: 3,
          view: 'single',
          name: 'pacountry',
          label: 'Country',
          type: 'dropdown',
          required: true,
          errorTile: 'Country',
          placeholder: 'Select',
          data: [],
        },
        {
          id: 4,
          view: 'single',
          name: 'pastate',
          label: 'State',
          type: 'dropdown',
          required: true,
          errorTile: 'State',
          placeholder: 'Select',
          data: [],
        },
        {
          id: 5,
          view: 'single',
          type: 'text',
          name: 'pacity',
          label: 'City',
          required: true,
          errorTile: 'City',
          placeholder: 'Enter',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
        },
        {
          id: 6,
          view: 'single',
          type: 'text',
          name: 'palocality',
          label: 'Locality',
          required: true,
          errorTile: 'Locality',
          placeholder: 'Enter',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
        },
        {
          id: 7,
          view: 'single',
          type: 'text',
          name: 'papostalcode',
          label: 'Zip / Postal Code',
          required: true,
          errorTile: 'Postal Code',
          placeholder: 'Enter',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
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
          name: 'foreignaddressdetails',
          label: '',
          type: 'radio',
          value: '',
          secureTextEntry: false,
          required: false,
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
          ],
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
          },
        },
        {
          id: 2,
          view: 'single',
          name: 'faaddress1',
          label: 'Address1',
          type: 'text',
          placeholder: 'Enter',
          value: '',
          secureTextEntry: false,
          required: false,
          multiline: true,
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(60),
          },
        },
        {
          id: 3,
          view: 'single',
          name: 'faaddress2',
          label: 'Address2',
          type: 'text',
          placeholder: 'Enter',
          value: '',
          secureTextEntry: false,
          required: false,
          multiline: true,
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(60),
          },
        },
        {
          id: 4,
          view: 'single',
          name: 'facountry',
          label: 'Country',
          type: 'dropdown',
          required: false,
          placeholder: 'Select',
          data: [],
        },
        {
          id: 5,
          view: 'single',
          name: 'fastate',
          label: 'State',
          type: 'dropdown',
          required: false,
          placeholder: 'Select',
          data: [],
        },
        {
          id: 6,
          view: 'single',
          type: 'text',
          name: 'facity',
          label: 'City',
          required: false,
          placeholder: 'Enter',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
        },
        {
          id: 7,
          view: 'single',
          type: 'text',
          name: 'falocality',
          label: 'Locality',
          required: false,
          placeholder: 'Enter',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
        },
        {
          id: 8,
          view: 'single',
          type: 'text',
          name: 'fapostalcode',
          label: 'Zip / Postal Code',
          required: false,
          placeholder: 'Enter',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
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
          name: 'pobcountry',
          label: 'Country',
          type: 'dropdown',
          required: true,
          errorTile: 'Country',
          placeholder: 'Select',
          data: [],
        },
        {
          id: 2,
          view: 'single',
          name: 'pobstate',
          label: 'State',
          type: 'dropdown',
          required: true,
          errorTile: 'State',
          placeholder: 'Select',
          data: [],
        },
        {
          id: 3,
          view: 'single',
          type: 'text',
          name: 'pobcity',
          label: 'City',
          required: true,
          errorTile: 'City',
          placeholder: 'Enter',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
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
          data: [],
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
          value: '',
          secureTextEntry: false,
          required: true,
          errorTile: 'Ethnicity',
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
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          },
        },
        {
          id: 2,
          view: 'single',
          name: 'race',
          label: 'Race',
          type: 'radio',
          value: '',
          secureTextEntry: false,
          required: true,
          errorTile: 'Race',
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
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
          },
        },
        {
          id: 3,
          view: 'single',
          name: 'haircolour',
          label: 'Hair Colour',
          type: 'dropdown',
          required: true,
          errorTile: 'Hair Colour',
          placeholder: 'Select',
          data: [
            {
              id: 24,
              value: 'BALD',
              label: 'Blad(No Hair)',
            },
            {
              id: 25,
              value: 'BALCK',
              label: 'Black',
            },
            {
              id: 26,
              value: 'BLOND',
              label: 'Blond',
            },
            {
              id: 27,
              value: 'GREY',
              label: 'Grey',
            },
            {
              id: 28,
              value: 'RED',
              label: 'Red',
            },
            {
              id: 29,
              value: 'SANDY',
              label: 'Sandy',
            },
            {
              id: 30,
              value: 'WHITE',
              label: 'White',
            },
            {
              id: 31,
              value: 'OTHER',
              label: 'Unknown/Other',
            },
          ],
        },
        {
          id: 4,
          view: 'single',
          name: 'eyecolour',
          label: 'Eye Colour',
          type: 'dropdown',
          required: true,
          errorTile: 'Eye Colour',
          placeholder: 'Select',
          data: [
            {
              id: 32,
              value: 'BLACK',
              label: 'Black',
            },
            {
              id: 33,
              value: 'BROWN',
              label: 'Brown',
            },
            {
              id: 34,
              value: 'BLUE',
              label: 'Blue',
            },
            {
              id: 35,
              value: 'GREY',
              label: 'Grey',
            },
            {
              id: 36,
              value: 'GREEN',
              label: 'Green',
            },
            {
              id: 37,
              value: 'HAZEL',
              label: 'Hazel',
            },
            {
              id: 38,
              value: 'MAROON',
              label: 'Maroon',
            },
            {
              id: 39,
              value: 'PINK',
              label: 'Pink',
            },
            {
              id: 40,
              value: 'OTHER',
              label: 'Unknown/Other',
            },
          ],
        },
        {
          id: 5,
          view: 'single',
          name: 'weight',
          label: 'Weight (in Pounds)',
          type: 'text',
          placeholder: 'Enter',
          value: '',
          secureTextEntry: false,
          required: true,
          errorTile: 'Weight',
          keyboardType: 'number-pad',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
        },
        {
          id: 6,
          view: 'single',
          name: 'height',
          label: 'Height (in Inches)',
          type: 'text',
          placeholder: 'Enter',
          value: '',
          secureTextEntry: false,
          required: true,
          errorTile: 'Height',
          keyboardType: 'number-pad',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
        },
        {
          id: 7,
          view: 'single',
          name: 'identification',
          label: 'Any marks of identification ?',
          type: 'text',
          placeholder: 'Enter',
          value: '',
          secureTextEntry: false,
          required: false,
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
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
          name: 'passportnumber',
          label: 'Passport Number',
          placeholder: 'Enter Passport Number',
          required: true,
          errorTile: 'Passport Number',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
        },
        {
          id: 12,
          view: 'single',
          type: 'text',
          name: 'Issuing Authority',
          label: 'Issuing Authority',
          placeholder: 'Enter Issuing Authority',
          required: true,
          errorTile: 'Issuing Authority',
          value: '',
          style: {
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
        },
        {
          id: 13,
          view: 'single',
          type: 'date',
          name: 'Date of Issue',
          label: 'Date of Issue',
          title: 'Date of Issue',
          placeholder: 'Enter Date of Issue',
          isOpen: false,
          isOpenTitle: 'isDOIOpen',
          required: true,
          errorTile: 'Date of Issue',
          value: '',
          style: {
            flex: 1,
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            height: scale(40),
          },
        },
        {
          id: 14,
          view: 'single',
          type: 'date',
          name: 'Date of Expiry',
          label: 'Date of Expiry',
          title: 'Date of Expiry',
          placeholder: 'Enter Date of Expiry',
          isOpen: false,
          isOpenTitle: 'isDOEOpen',
          required: true,
          errorTile: 'Date of Expiry',
          value: '',
          style: {
            flex: 1,
            backgroundColor: 'white',
            borderColor: '#C3D0DE',
            borderWidth: 1,
            borderRadius: 5,
            padding: 10,
            marginBottom: 10,
            height: scale(40),
          },
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
