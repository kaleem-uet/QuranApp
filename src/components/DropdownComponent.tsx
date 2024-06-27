import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

interface DropdownItem {
  label: string;
  value: number;
}

interface DropdownComponentProps {
  data: DropdownItem[];
  placeholder: string;
  searchPlaceholder: string;
  selectedValue: number;
  setSelectedValue: (value: number) => void;
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({
  data,
  placeholder,
  searchPlaceholder,
  selectedValue,
  setSelectedValue,
}) => {
  const renderItem = (item: DropdownItem) => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      data={data}
      search
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      searchPlaceholder={searchPlaceholder}
      value={selectedValue}
      onChange={(item: DropdownItem) => {
        setSelectedValue(item.value);
      }}
      renderItem={renderItem}
    />
  );
};


const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
});

export default DropdownComponent;
