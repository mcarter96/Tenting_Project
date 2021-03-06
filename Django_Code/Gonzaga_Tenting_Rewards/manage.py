#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    os.environ.setdefault("DJANGO_SETTINGS_MODULE", "Gonzaga_Tenting_Rewards.settings")
    try:
        from django.core.management import execute_from_command_line
        is_testing = 'test' in sys.argv
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    if is_testing:
        import coverage
        cov = coverage.coverage(source=['User_Profile', 'Tent_Checks', 'Game', 'Tents', 'Admin_Maintenance'], omit=['*/tests.*'])
        cov.erase()
        cov.start()

    execute_from_command_line(sys.argv)

    if is_testing:
        cov.stop()
        cov.save()
        cov.report()