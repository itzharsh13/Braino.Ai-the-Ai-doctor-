#!/usr/bin/env python
"""Test that the entire backend can import and initialize."""

try:
    print("Importing chat module...")
    from chat import FEATURES, le, model, predict_disease
    
    print(f"✓ chat module imported successfully")
    print(f"✓ Model type: {type(model).__name__}")
    print(f"✓ Label encoder: {'LabelEncoder (loaded)' if le else 'None (fallback mode)'}")
    print(f"✓ Features: {FEATURES}")
    
    # Test prediction
    print("\nTesting predict_disease...")
    test_symptoms = {'sleep': 1, 'anxiety': 1}
    result = predict_disease(test_symptoms)
    print(f"✓ Sample prediction with {test_symptoms}: {result}")
    
    print("\n✓✓✓ BACKEND READY! ✓✓✓")
    
except Exception as e:
    import traceback
    print(f"✗ ERROR: {e}")
    traceback.print_exc()
