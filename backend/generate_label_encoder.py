#!/usr/bin/env python
"""Generate label encoder from trained model or create default one."""

import pickle
import numpy as np
from sklearn.preprocessing import LabelEncoder
import os

model_path = r'C:\BrainoAi\trained model\model.pkl'
encoder_path = r'C:\BrainoAi\trained model\label_encoder.pkl'

print("Loading model...")
model = pickle.load(open(model_path, 'rb'))

# Try to get classes from the model
try:
    classes = model.classes_
    print(f'✓ Model classes found: {classes}')
except Exception as e:
    print(f'✗ Could not get classes from model: {e}')
    classes = None

# If we found classes, create a label encoder
if classes is not None:
    le = LabelEncoder()
    le.fit(classes)
    
    # Save the label encoder
    os.makedirs(os.path.dirname(encoder_path), exist_ok=True)
    with open(encoder_path, 'wb') as f:
        pickle.dump(le, f)
    
    print(f'✓ Label encoder created and saved with {len(classes)} classes')
    print(f'✓ Classes: {list(classes)}')
else:
    print('ℹ Creating default label encoder for common mental health conditions...')
    # Create a default label encoder with common mental health conditions
    common_conditions = [
        'Anxiety Disorder',
        'Depression',
        'PTSD',
        'OCD',
        'Insomnia',
        'Stress',
        'Bipolar Disorder',
        'Panic Disorder',
        'Social Anxiety',
        'Chronic Fatigue'
    ]
    
    le = LabelEncoder()
    le.fit(common_conditions)
    
    os.makedirs(os.path.dirname(encoder_path), exist_ok=True)
    with open(encoder_path, 'wb') as f:
        pickle.dump(le, f)
    
    print(f'✓ Default label encoder created and saved')
    print(f'✓ Classes: {list(le.classes_)}')

# Verify the encoder was saved
if os.path.exists(encoder_path):
    print(f'\n✓ SUCCESS: {encoder_path} created successfully')
    # Load and verify
    le_test = pickle.load(open(encoder_path, 'rb'))
    print(f'✓ Verification: Encoder has {len(le_test.classes_)} classes')
else:
    print(f'\n✗ FAILED: Could not find {encoder_path}')
