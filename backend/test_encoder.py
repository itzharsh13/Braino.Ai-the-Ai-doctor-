#!/usr/bin/env python
"""Verify label_encoder.pkl works."""

import pickle

encoder_path = r'C:\BrainoAi\trained model\label_encoder.pkl'

try:
    le = pickle.load(open(encoder_path, 'rb'))
    print('✓ Label encoder loaded successfully')
    print(f'✓ Classes count: {len(le.classes_)}')
    print(f'✓ Classes: {le.classes_}')
    
    # Test transform
    sample = le.transform([0])
    print(f'✓ Sample transform [0] -> {sample}')
    
    # Test inverse transform
    back = le.inverse_transform([0])
    print(f'✓ Inverse transform [0] -> {back}')
    
    print('\n✓✓✓ LABEL ENCODER WORKS! ✓✓✓')
except Exception as e:
    print(f'✗ ERROR: {e}')
