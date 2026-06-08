from django.db import models


class TransportRoute(models.Model):
    route_name = models.CharField(
        max_length=200,
        unique=True
    )

    starting_point = models.CharField(
        max_length=200
    )

    ending_point = models.CharField(
        max_length=200
    )

    distance_km = models.DecimalField(
        max_digits=6,
        decimal_places=2,
        null=True,
        blank=True
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ['route_name']
        verbose_name = 'Transport Route'
        verbose_name_plural = 'Transport Routes'

    def __str__(self):
        return (
            f"{self.route_name}: "
            f"{self.starting_point} → "
            f"{self.ending_point}"
        )

    @property
    def total_available_seats(self):
        return sum(
            b.available_seats
            for b in self.buses.all()
        )

    @property
    def total_seats(self):
        return sum(
            b.total_seats
            for b in self.buses.all()
        )

    @property
    def occupied_seats(self):
        return (
            self.total_seats -
            self.total_available_seats
        )

    @property
    def occupancy_percentage(self):
        if self.total_seats == 0:
            return 0

        return round(
            (
                self.occupied_seats /
                self.total_seats
            ) * 100
        )


class Bus(models.Model):

    route = models.ForeignKey(
        TransportRoute,
        on_delete=models.CASCADE,
        related_name='buses'
    )

    bus_number = models.CharField(
        max_length=50,
        unique=True
    )

    total_seats = models.PositiveIntegerField(
        default=50
    )

    available_seats = models.PositiveIntegerField(
        default=40
    )

    driver_name = models.CharField(
        max_length=100,
        blank=True,
        default=''
    )

    driver_phone = models.CharField(
        max_length=15,
        blank=True,
        default=''
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:
        ordering = ['bus_number']
        verbose_name = 'Bus'
        verbose_name_plural = 'Buses'

    def __str__(self):
        return (
            f"Bus {self.bus_number} "
            f"on {self.route.route_name}"
        )