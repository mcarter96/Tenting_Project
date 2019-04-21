from rest_framework import viewsets, status
from rest_framework.response import Response
from . import models
from . import serializers
from . import permissions
from Helper_Functions import user_functions
from django.db import models as db_models
from django.db import connection
from Gonzaga_Tenting_Rewards import settings

def dictfetchall(cursor):
    "Return all rows from a cursor as a dict"
    columns = [col[0] for col in cursor.description]
    return [
        dict(zip(columns, row))
        for row in cursor.fetchall()
    ]

# Create your views here.
class TentCheckViewSet(viewsets.ModelViewSet):
    """Logic to assign tents to a game"""

    serializer_class = serializers.TentCheckSerializer

    queryset = models.Tent_Check.objects.all()

    permission_classes = (permissions.InteractWithTentChecks,)


    def list(self, request, *args, **kwargs):
        """Function runs whenever retrieving a specific tent object"""
        queryset = self.filter_queryset(self.get_queryset())

        # Determine if there were any query params listed in the url and sort data appropriately
        filters = ""
        # See if they want any missing checks
        missing_check = self.request.query_params.get('missing_check')
        if missing_check is not None:
            params = {}
            # Generate a list of all checks they want to complete
            checks = missing_check.split(',')
            for check in checks:
                if check in [field.name for field in models.Tent_Check._meta.fields]:
                    params[check] = False
                    if settings.DEBUG:
                        filters += " %s = 0" % (check)
                    else:
                        filters += " %s = false" % (check)
            # Filter on parameters

        # Filter to only view tents that have completed all tent checks
        done_tents = self.request.query_params.get('done_tents')
        if done_tents is not None and done_tents == 'True':
            params = {}
            # Grab a list of all the tent check boolean fields (AKA all tent check fields) from the tent check model
            for field in models.Tent_Check._meta.get_fields():
                if type(field) == db_models.BooleanField:
                    params[field.name] = True
                    if settings.DEBUG:
                        filters += " %s = 1" % (field.name)
                    else:
                        filters += " %s = true" % (field.name)

        completed_check = self.request.query_params.get('completed_check')
        if completed_check is not None:
            print(completed_check)
            params = {}
            # Generate a list of all checks they want to complete
            checks = completed_check.split(',')
            for check in checks:
                if check in [field.name for field in models.Tent_Check._meta.fields]:
                    params[check] = True
                    if settings.DEBUG:
                        filters += " %s = 1" % (check)
                    else:
                        filters += " %s = true" % (check)

        with connection.cursor() as cursor:
            if filters != "":
                filters = "WHERE" + filters
            else:
                filters = ""
            print(filters)
            cursor.execute('SELECT tc.id, tc.tent_id_id AS tent_id, tc.waiver_check, tc.setup_check, tc.tent_check_1, '
                           'tc.tent_check_2, tc.tent_check_3, tc.tent_check_4, tc.final_check, '
                           'up1.student_id as tenter_1_student_id, up2.student_id AS tenter_2_student_id, '
                           'up3.student_id AS tenter_3_student_id, up4.student_id AS tenter_4_student_id, '
                           'up5.student_id AS tenter_5_student_id, up6.student_id AS tenter_6_student_id '
                           'FROM Tent_Checks_tent_check tc JOIN Tents_tentgroup tg ON tc.tent_id_id = tg.id '
                           'LEFT JOIN User_Profile_userprofile up1 ON up1.id = tg.tenter_1_id '
                           'LEFT JOIN User_Profile_userprofile up2 ON up2.id = tg.tenter_2_id '
                           'LEFT JOIN User_Profile_userprofile up3 ON up3.id = tg.tenter_3_id '
                           'LEFT JOIN User_Profile_userprofile up4 ON up4.id = tg.tenter_4_id '
                           'LEFT JOIN User_Profile_userprofile up5 ON up5.id = tg.tenter_5_id '
                           'LEFT JOIN User_Profile_userprofile up6 ON up6.id = tg.tenter_6_id %s;' % (filters))
            queryset = dictfetchall(cursor)


        page = self.paginate_queryset(queryset)
        if page is not None:
            return self.get_paginated_response(queryset)


        return Response(queryset)

    def create(self, request, *args, **kwargs):
        """Create a game"""

        serializer = self.get_serializer(data=request.data)

        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)