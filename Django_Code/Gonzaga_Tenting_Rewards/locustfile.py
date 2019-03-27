from locust import HttpLocust, TaskSet, task, TaskSequence, seq_task
import json

class LoginTaskSet(TaskSequence):

    token = None

    @seq_task(1)
    def login(self):
        request = self.client.post("/api/login/", json={"username": "locust@zagmail.gonzaga.edu", "password": "somePassword"}, )
        data = None
        if request is not None and request.content is not None:
            data = json.loads(request.content.decode('utf-8'))
        # print(data)
        if data is not None:
            self.token = 'Token %s' % (data['token'])

    @seq_task(2)
    def get_profiles(self):
        if self.token is not None:
            self.client.get("/api/profile/", headers={'Authorization': self.token})


class ViewProfiles(TaskSet):

    token = 'b01bea9ea80a09af8bd53fa422618e25b38e9e9d'

    @task
    def profiles(self):
        if self.token is not None:
            self.client.get("/api/profile/", headers={'Authorization': self.token})


class MyLocust(HttpLocust):
    task_set = LoginTaskSet
    min_wait = 5000
    max_wait = 15000

