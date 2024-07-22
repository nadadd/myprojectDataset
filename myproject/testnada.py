import streamlit as st
import pandas as pd
import numpy as np


# Function to parse values in the dataset
def parse_value(value):
    if pd.isna(value) or value in [None, ""]:
        return 0.7
    elif value is True or isinstance(value, (int, str)):
        return 0.9
    elif value is False:
        return 0.5
    return value


# Function to calculate Euclidean distance
def calculate_euclidean_distance(user_priorities, row_values):
    return np.linalg.norm(np.array(user_priorities) - np.array(row_values))


# Function to prioritize and sort the dataset
def prioritize_and_sort_dataset(dataset, user_priorities):
    # Apply the parse_value function to the entire dataset
    dataset = dataset.applymap(parse_value)

    # Calculate Euclidean distances for each row
    distances = dataset.apply(
        lambda row: calculate_euclidean_distance(user_priorities, row), axis=1
    )

    # Add distances to the dataset
    dataset['distance'] = distances

    # Sort the dataset based on distances
    sorted_dataset = dataset.sort_values(by='distance').reset_index(drop=True)

    return sorted_dataset


# Load the dataset
file_path = r'C:\Users\nadad\OneDrive\Bureau\myproject\myproject\datasets\dataset22.csv'
dataset = pd.read_csv(file_path, encoding='ISO-8859-1')

# Streamlit app title
st.title('Dataset Prioritization App')

# List of columns to prioritize (all columns in the dataset)
columns_to_prioritize = dataset.columns.tolist()

# User input for priorities
user_priorities = []
st.sidebar.header('Set Priorities')
for col in columns_to_prioritize:
    priority = st.sidebar.selectbox(
        f'Priority for {col}',
        options=['Min', 'Medium', 'Max'],
        index=1
    )
    if priority == 'Min':
        user_priorities.append(0.5)
    elif priority == 'Medium':
        user_priorities.append(0.7)
    else:
        user_priorities.append(0.9)

# Sort the dataset based on user priorities
sorted_dataset = prioritize_and_sort_dataset(dataset, user_priorities)

# Display the sorted dataset
st.write(sorted_dataset)