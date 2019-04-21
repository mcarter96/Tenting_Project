from locust import HttpLocust, task, TaskSet
import json


def binary_to_dict(the_binary):
    d = json.loads(the_binary.decode('utf-8'))
    return d

# class LoginTaskSet(TaskSequence):

#     token = None

#     @seq_task(1)
#     def login(self):
#         request = self.client.post("/api/login/", json={"username": "test1@zagmail.gonzaga.edu", "password": "somePassword"}, )
#         data = None
#         if request.content is not None:
#             data = binary_to_dict(request.content)
#         if request is not None and request.content is not None:
#             data = json.loads(request.content.decode('utf-8'))
#         # print(data)
#         if data is not None:
#             self.token = 'Token %s' % (data['token'])

#     @seq_task(2)
#     def get_profiles(self):
#         if self.token is not None:
#             self.client.get("/api/profile/", headers={'Authorization': self.token})


class ViewProfiles(TaskSet):

    token = '0472d271e0dd2668afcf3e57a376c4c9cda55aee'

    @task
    def profiles(self):
        if self.token is not None:
            self.client.get("/api/profile/", headers={'Authorization': 'Token ' + self.token})


class MyLocust(HttpLocust):
    task_set = ViewProfiles
    min_wait = 5000
    max_wait = 15000

